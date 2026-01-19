import { AbstractFileProviderService, MedusaError } from '@medusajs/framework/utils';
import { Logger } from '@medusajs/framework/types';
import {
  ProviderUploadFileDTO,
  ProviderDeleteFileDTO,
  ProviderFileResultDTO,
  ProviderGetFileDTO,
  ProviderGetPresignedUploadUrlDTO
} from '@medusajs/framework/types';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';
import { ulid } from 'ulid';
import { Readable } from 'stream';

type InjectedDependencies = {
  logger: Logger
}

interface R2ServiceConfig {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  endpoint: string
  publicUrl: string
}

export interface R2FileProviderOptions {
  accessKeyId: string
  secretAccessKey: string
  bucket: string
  endpoint: string
  publicUrl: string
}

/**
 * Service to handle file storage using Cloudflare R2.
 * R2 is S3-compatible, so we use the AWS S3 SDK.
 */
class R2FileProviderService extends AbstractFileProviderService {
  static identifier = 'r2-file'
  protected readonly config_: R2ServiceConfig
  protected readonly logger_: Logger
  protected client: S3Client

  constructor({ logger }: InjectedDependencies, options: R2FileProviderOptions) {
    super()
    this.logger_ = logger

    this.config_ = {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      bucket: options.bucket,
      endpoint: options.endpoint,
      publicUrl: options.publicUrl.replace(/\/$/, ''), // Remove trailing slash
    }

    this.logger_.info(`R2 service initialized with bucket: ${this.config_.bucket}, endpoint: ${this.config_.endpoint}`)

    // Initialize S3 client for R2
    this.client = new S3Client({
      region: 'auto', // R2 uses 'auto' for region
      endpoint: this.config_.endpoint,
      credentials: {
        accessKeyId: this.config_.accessKeyId,
        secretAccessKey: this.config_.secretAccessKey,
      },
    })
  }

  static validateOptions(options: Record<string, any>) {
    const requiredFields = [
      'accessKeyId',
      'secretAccessKey',
      'bucket',
      'endpoint',
      'publicUrl'
    ]

    requiredFields.forEach((field) => {
      if (!options[field]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${field} is required in the provider's options`
        )
      }
    })
  }

  async upload(
    file: ProviderUploadFileDTO
  ): Promise<ProviderFileResultDTO> {
    if (!file) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file provided'
      )
    }

    if (!file.filename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No filename provided'
      )
    }

    try {
      const parsedFilename = path.parse(file.filename)
      const fileKey = `${parsedFilename.name}-${ulid()}${parsedFilename.ext}`

      // Handle different content types properly
      let content: Buffer
      if (Buffer.isBuffer(file.content)) {
        content = file.content
      } else if (typeof file.content === 'string') {
        // If it's a base64 string, decode it
        if (file.content.match(/^[A-Za-z0-9+/]+=*$/)) {
          content = Buffer.from(file.content, 'base64')
        } else {
          content = Buffer.from(file.content, 'binary')
        }
      } else {
        // Handle ArrayBuffer, Uint8Array, or any other buffer-like type
        content = Buffer.from(file.content as any)
      }

      // Upload file to R2
      const command = new PutObjectCommand({
        Bucket: this.config_.bucket,
        Key: fileKey,
        Body: content,
        ContentType: file.mimeType,
        Metadata: {
          'original-filename': file.filename,
        },
      })

      await this.client.send(command)

      // Generate public URL using the R2 public URL
      const url = `${this.config_.publicUrl}/${fileKey}`

      this.logger_.info(`Successfully uploaded file ${fileKey} to R2 bucket ${this.config_.bucket}`)

      return {
        url,
        key: fileKey
      }
    } catch (error) {
      this.logger_.error(`Failed to upload file: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to upload file: ${error.message}`
      )
    }
  }

  async delete(
    fileData: ProviderDeleteFileDTO | ProviderDeleteFileDTO[]
  ): Promise<void> {
    const files = Array.isArray(fileData) ? fileData : [fileData];

    for (const file of files) {
      if (!file?.fileKey) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          'No file key provided'
        );
      }

      try {
        const command = new DeleteObjectCommand({
          Bucket: this.config_.bucket,
          Key: file.fileKey,
        })

        await this.client.send(command)
        this.logger_.info(`Successfully deleted file ${file.fileKey} from R2 bucket ${this.config_.bucket}`);
      } catch (error) {
        this.logger_.warn(`Failed to delete file ${file.fileKey}: ${error.message}`);
      }
    }
  }

  async getPresignedDownloadUrl(
    fileData: ProviderGetFileDTO
  ): Promise<string> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.config_.bucket,
        Key: fileData.fileKey,
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 24 * 60 * 60, // URL expires in 24 hours
      })

      this.logger_.info(`Generated presigned URL for file ${fileData.fileKey}`)
      return url
    } catch (error) {
      this.logger_.error(`Failed to generate presigned URL: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to generate presigned URL: ${error.message}`
      )
    }
  }

  async getPresignedUploadUrl(
    fileData: ProviderGetPresignedUploadUrlDTO
  ): Promise<ProviderFileResultDTO> {
    if (!fileData?.filename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No filename provided'
      )
    }

    try {
      // Use the filename directly as the key
      const fileKey = fileData.filename

      const command = new PutObjectCommand({
        Bucket: this.config_.bucket,
        Key: fileKey,
      })

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 15 * 60, // URL expires in 15 minutes
      })

      return {
        url,
        key: fileKey
      }
    } catch (error) {
      this.logger_.error(`Failed to generate presigned upload URL: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to generate presigned upload URL: ${error.message}`
      )
    }
  }

  async getAsBuffer(fileData: ProviderGetFileDTO): Promise<Buffer> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.config_.bucket,
        Key: fileData.fileKey,
      })

      const response = await this.client.send(command)

      if (!response.Body) {
        throw new Error('Empty response body')
      }

      // Convert stream to buffer
      const stream = response.Body as Readable
      const chunks: Buffer[] = []

      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk))
      }

      const buffer = Buffer.concat(chunks)
      this.logger_.info(`Retrieved buffer for file ${fileData.fileKey}`)
      return buffer
    } catch (error) {
      this.logger_.error(`Failed to get buffer: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to get buffer: ${error.message}`
      )
    }
  }

  async getDownloadStream(fileData: ProviderGetFileDTO): Promise<Readable> {
    if (!fileData?.fileKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'No file key provided'
      )
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.config_.bucket,
        Key: fileData.fileKey,
      })

      const response = await this.client.send(command)

      if (!response.Body) {
        throw new Error('Empty response body')
      }

      this.logger_.info(`Retrieved download stream for file ${fileData.fileKey}`)
      return response.Body as Readable
    } catch (error) {
      this.logger_.error(`Failed to get download stream: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to get download stream: ${error.message}`
      )
    }
  }
}

export default R2FileProviderService
