# Environment Variables - Leone D'Oro Infrastructure

This document outlines environment variables for the Leone D'Oro MedusaJS e-commerce platform.

---

## Cloudflare R2 Storage

### Backend (Railway)

Add these environment variables to your Railway backend service:

```
R2_ACCESS_KEY_ID=<your-r2-access-key-id>
R2_SECRET_ACCESS_KEY=<your-r2-secret-access-key>
R2_BUCKET_NAME=<your-bucket-name>
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-<id>.r2.dev
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `R2_ACCESS_KEY_ID` | R2 API Token Access Key ID | `abc123def456...` |
| `R2_SECRET_ACCESS_KEY` | R2 API Token Secret Access Key | `xyz789ghi012...` |
| `R2_BUCKET_NAME` | Name of your R2 bucket | `leone-doro-media` |
| `R2_ENDPOINT` | R2 S3 API endpoint (includes account ID) | `https://abc123.r2.cloudflarestorage.com` |
| `R2_PUBLIC_URL` | Public URL for accessing files (r2.dev subdomain or custom domain) | `https://pub-abc123.r2.dev` |

### Storefront (Vercel)

Add this environment variable to your storefront deployment:

```
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-<id>.r2.dev
```

This must match the `R2_PUBLIC_URL` from the backend. It's used for Next.js image optimization configuration.

---

## Search Configuration

**Important:** Product search now uses Postgres full-text search, which is built into MedusaJS. No additional environment variables are needed for search functionality - it works through the standard Medusa API.

Search goes through:
- Backend: Standard `sdk.store.product.list({ q: "search term" })` call
- Storefront: Uses `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (already configured)

---

## Obsolete Variables (REMOVE THESE)

After the infrastructure optimizations, remove these old variables:

### Backend (Railway)

**MinIO (replaced by R2):**
- `MINIO_ENDPOINT`
- `MINIO_ACCESS_KEY`
- `MINIO_SECRET_KEY`
- `MINIO_BUCKET`

**MeiliSearch (replaced by Postgres full-text search):**
- `MEILISEARCH_HOST`
- `MEILISEARCH_ADMIN_KEY`

### Storefront (Vercel)

**MinIO (replaced by R2):**
- `NEXT_PUBLIC_MINIO_ENDPOINT`

**MeiliSearch (no longer needed):**
- `NEXT_PUBLIC_SEARCH_ENDPOINT`
- `NEXT_PUBLIC_SEARCH_API_KEY`
- `MEILISEARCH_API_KEY`
- `NEXT_PUBLIC_INDEX_NAME`

---

## Cloudflare R2 Setup

### 1. Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in the sidebar
3. Click **Create bucket**
4. Enter bucket name (e.g., `leone-doro-media`)
5. Choose location hint (optional, select closest to your users)
6. Click **Create bucket**

### 2. Enable Public Access

1. Go to your bucket settings
2. Click **Settings** tab
3. Under **Public access**, click **Allow Access**
4. This will generate a public URL like `https://pub-<id>.r2.dev`
5. Copy this URL - this is your `R2_PUBLIC_URL`

**Note:** Alternatively, you can connect a custom domain for a branded URL.

### 3. Create API Token

1. Go to **R2** → **Manage R2 API Tokens** (or **Settings** → **API Tokens**)
2. Click **Create API Token**
3. Give it a name (e.g., `leone-doro-backend`)
4. Select permissions:
   - **Object Read & Write** for your specific bucket
5. Click **Create API Token**
6. Copy the **Access Key ID** and **Secret Access Key** immediately (shown only once)

### 4. Get Account ID and Endpoint

1. Your Account ID is visible in the URL: `https://dash.cloudflare.com/<account-id>/r2`
2. Your R2 endpoint is: `https://<account-id>.r2.cloudflarestorage.com`

---

## Verification Checklists

### R2 Storage

- [ ] Backend can upload images to R2 (test via Medusa admin)
- [ ] Uploaded images are publicly accessible via R2_PUBLIC_URL
- [ ] Storefront displays images correctly from R2
- [ ] Product images load properly
- [ ] Category images load properly
- [ ] No console errors related to image loading

### Search Functionality

- [ ] Basic keyword search works (e.g., "gold", "ring", "necklace")
- [ ] Search returns relevant results
- [ ] Category filtering works alongside search
- [ ] Empty search shows all products
- [ ] No console errors related to search
- [ ] Search performance is acceptable (< 500ms)

---

## Troubleshooting

### Images not loading on storefront
- Verify `NEXT_PUBLIC_R2_PUBLIC_URL` is set correctly
- Check that the bucket has public access enabled
- Ensure the URL in the env var matches the Cloudflare-provided public URL

### Upload failures in backend
- Verify all R2 environment variables are set
- Check that the API token has write permissions for the bucket
- Ensure the endpoint URL is correct (includes account ID)

### Search not returning results
- Verify the backend is properly connected to Postgres
- Check that products exist in the database
- Verify the `q` parameter is being passed correctly in API calls
- Check backend logs for any search-related errors

### CORS issues
R2 handles CORS automatically for public buckets. If you experience issues:
1. Go to bucket settings
2. Add CORS rules if needed for your specific domain
