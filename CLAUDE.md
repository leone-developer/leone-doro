# Migrate from MinIO to Cloudflare R2

## Context
This MedusaJS monorepo currently uses MinIO for image storage on Railway. We're migrating to Cloudflare R2 to reduce costs.

## Current Setup
- **Backend (MedusaJS)**: Uses MinIO via environment variables
  - `MINIO_ENDPOINT`
  - `MINIO_ACCESS_KEY`
  - `MINIO_SECRET_KEY`

- **Storefront (Next.js)**: References MinIO endpoint for displaying images
  - `NEXT_PUBLIC_MINIO_ENDPOINT`

## Prerequisites (I will provide these)
- Cloudflare R2 bucket created
- R2 Access Key ID
- R2 Secret Access Key
- R2 bucket name
- R2 endpoint URL (format: `https://<account-id>.r2.cloudflarestorage.com`)
- R2 public URL for the bucket (format: `https://pub-<id>.r2.dev` or custom domain)

## Tasks

### 1. Backend Migration
**Install S3-compatible storage plugin for MedusaJS:**
- Check which file storage plugin is currently configured in `medusa-config.js/ts`
- Install the appropriate plugin for S3-compatible storage (Cloudflare R2 is S3-compatible)
- Most likely: `@medusajs/file-s3` or similar

**Update medusa-config.js/ts:**
- Replace MinIO file storage configuration with R2 configuration
- Use these new environment variables:
  - `R2_ACCESS_KEY_ID`
  - `R2_SECRET_ACCESS_KEY`
  - `R2_BUCKET_NAME`
  - `R2_ENDPOINT`
  - `R2_PUBLIC_URL` (for serving images publicly)
- Ensure configuration is S3-compatible (R2 uses S3 API)

**Update package.json:**
- Add any necessary dependencies
- Update any MinIO-specific packages

### 2. Storefront Migration
**Update environment variable references:**
- Replace `NEXT_PUBLIC_MINIO_ENDPOINT` with `NEXT_PUBLIC_R2_PUBLIC_URL`
- Find all places in the storefront code that reference the MinIO endpoint
- Update them to use the R2 public URL instead

**Update image URL construction:**
- Check how images are currently loaded (e.g., `${MINIO_ENDPOINT}/${bucket}/${path}`)
- Update to R2 format (e.g., `${R2_PUBLIC_URL}/${path}`)
- R2 public URLs typically don't need the bucket in the path

### 3. Environment Variables Documentation
**Create a file: `docs/environment-variables.md`**

Document the new environment variables needed:

**Backend (Railway):**
```
R2_ACCESS_KEY_ID=<from Cloudflare>
R2_SECRET_ACCESS_KEY=<from Cloudflare>
R2_BUCKET_NAME=<bucket name>
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-<id>.r2.dev
```

**Storefront (Railway → Vercel eventually):**
```
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-<id>.r2.dev
```

Remove these obsolete variables:
- `MINIO_ENDPOINT`
- `MINIO_ACCESS_KEY`
- `MINIO_SECRET_KEY`
- `NEXT_PUBLIC_MINIO_ENDPOINT`

### 4. Verification Steps
**Create a checklist in the migration doc:**
- [ ] Backend can upload images to R2
- [ ] Uploaded images are publicly accessible via R2_PUBLIC_URL
- [ ] Storefront displays images correctly from R2
- [ ] Product images load properly
- [ ] Category images load properly
- [ ] No console errors related to image loading

## Tech Stack
- MedusaJS backend
- Next.js storefront
- Node.js/TypeScript
- pnpm package manager
- Deployed on Railway (backend will stay, storefront moving to Vercel later)

## Notes
- We have NO existing images to migrate, so skip any migration scripts
- R2 is S3-compatible, so we can use S3 plugins/libraries
- R2 is much cheaper than MinIO on Railway
- After this migration, we can remove the MinIO and Console services from Railway

## Implementation Request
Please:
1. Analyze the current file storage configuration in both backend and storefront
2. Implement all the changes listed above
3. Create the environment variables documentation
4. Provide clear instructions on what I need to do in Cloudflare dashboard
5. List the new environment variables I need to set on Railway