# Infrastructure Optimization Tasks

## Overview
This document contains tasks for optimizing the Leone D'Oro MedusaJS infrastructure to reduce hosting costs while maintaining functionality.

---

## Task 1: Migrate from MinIO to Cloudflare R2 ✅ COMPLETED

### Context
Migrated from MinIO for image storage on Railway to Cloudflare R2 to reduce costs.

### Status
✅ Backend configured for R2
✅ Storefront configured for R2  
✅ MinIO and Console services removed from Railway
✅ Storefront moved to Vercel

---

## Task 2: Migrate from MeiliSearch to Postgres Full-Text Search ✅ COMPLETED

### Context
Migrated backend search from MeiliSearch to Postgres full-text search to reduce infrastructure complexity and costs.

### Status
✅ Backend configured for Postgres search
✅ Admin dashboard search working with Postgres (fast enough for small catalog)
✅ MeiliSearch dependencies removed from backend

---

## Task 3: Remove Search Feature from Storefront

### Context
After testing, the storefront search using Postgres full-text search is slower than desired and has UI issues (thumbnails not showing, requires pressing Enter). For a jewelry e-commerce store with a small catalog (< 200 products), search is not essential - customers prefer to browse by category, filter by attributes, and sort by price. Removing search will simplify the UX and eliminate performance issues.

### Current Storefront Search Implementation
- Search UI component (likely in header/navigation)
- Search results page or modal
- Search using Postgres full-text search via MedusaJS SDK
- Environment variables related to search (to be removed)

### Why Remove Search from Storefront?

**User Behavior:**
- Jewelry shoppers browse visually by category
- Small catalogs make browsing all products easy
- Filtering (gold type, price, category) is more useful than search
- Visual shopping experience > text search

**Technical Issues:**
- Current Postgres search is slower on storefront
- Thumbnail loading issues
- Requires Enter key press (poor UX)

**Benefits of Removal:**
- ✅ Cleaner, simpler navigation
- ✅ No search performance issues to debug
- ✅ Focus on category browsing and filtering
- ✅ Better mobile experience (less clutter)
- ✅ One less feature to maintain

### Tasks

#### 1. Remove Search UI Components

**Identify and remove:**
- Search bar component (likely in header/nav)
- Search input field
- Search results display (modal, page, or dropdown)
- Search icon/button
- Any search-related routing (e.g., `/search` page)
- Search keyboard shortcuts if any
- Search suggestions/autocomplete if implemented

**Common locations to check:**
- `components/common/header` or `components/layout/header`
- `components/search/`
- `app/search/` or `pages/search/`
- Navigation components
- Mobile menu components

#### 2. Remove Search Functionality

**Remove search API calls:**
- Any MedusaJS SDK search method calls from storefront
- Search-related API endpoints or server actions
- Search state management (React state, contexts, etc.)

**Remove search-related dependencies:**
- Check `package.json` for search-specific libraries
- Remove unused search dependencies (e.g., search UI libraries)

#### 3. Verify and Improve Filtering

**Audit existing filter functionality:**
- [ ] Category filtering works correctly
- [ ] Price range filtering works
- [ ] Gold purity filtering (14k, 18k, etc.) works
- [ ] Any other attribute filters work
- [ ] Filters can be combined
- [ ] Filters work on mobile
- [ ] Filter reset/clear functionality works

**Ensure sorting options exist:**
- [ ] Sort by price (low to high)
- [ ] Sort by price (high to low)
- [ ] Sort by newest/latest
- [ ] Default sort order makes sense

**Category navigation:**
- [ ] All product categories are easily accessible
- [ ] Category pages display products correctly
- [ ] Category pages have proper filtering
- [ ] Breadcrumbs work correctly

#### 4. Update Navigation/Header

**After removing search:**
- Reclaim header space for other elements
- Consider emphasizing category navigation
- Ensure mobile menu is clean without search
- Test header on mobile and desktop

**Optional improvements:**
- Make category links more prominent
- Add "Shop All" or "Browse Collection" CTA
- Improve visual hierarchy in navigation

#### 5. Clean Up Environment Variables

**Storefront (Vercel) - REMOVE:**
```
MEILISEARCH_API_KEY (remove - no longer needed)
NEXT_PUBLIC_SEARCH_ENDPOINT (remove - already removed)
NEXT_PUBLIC_INDEX_NAME (remove - already removed)
```

**Verify these are already removed from Vercel:**
- Go to Vercel project settings → Environment Variables
- Confirm search-related variables are gone
- Redeploy if needed

#### 6. Backend Cleanup

**Backend (Railway) - VERIFY REMOVAL:**
Confirm these are removed from both Backend and Backend-Worker:
```
MEILISEARCH_HOST (should be removed)
MEILISEARCH_MASTER_KEY (should be removed)
```

**After verification:**
- [ ] Remove MeiliSearch service from Railway
- [ ] Remove meilisearch-volume from Railway

### Testing Checklist

**After removing search:**
- [ ] Header/navigation looks clean and uncluttered
- [ ] Mobile navigation works properly
- [ ] No console errors related to search
- [ ] No broken links or 404s
- [ ] Category pages load correctly
- [ ] All filters work properly
- [ ] Sorting options work correctly
- [ ] Product browsing feels intuitive
- [ ] No references to search in UI
- [ ] Page load performance is good

**User flow testing:**
- [ ] User can find products by browsing categories
- [ ] User can filter products by relevant attributes
- [ ] User can sort products by price
- [ ] Mobile experience is smooth
- [ ] Desktop experience is smooth

### Final Railway Architecture

After all migrations complete, Railway will have only 4 services:
- Backend (Medusa API + Admin with Postgres search)
- Backend-Worker (Background jobs)
- Postgres (Database + Search)
- Redis (Cache/Sessions)

**Monthly cost savings:**
- Removed MinIO + Console: ~$10-15/mo
- Removed MeiliSearch + volume: ~$5-10/mo
- Moved Storefront to Vercel: ~$5-10/mo
- **Total savings: ~$20-35/mo**

### Notes

- Admin dashboard still has search functionality (using Postgres) which works perfectly fine
- Storefront focuses on browsing and filtering instead of search
- This is a common pattern for small-catalog e-commerce stores
- Can always add search back later if catalog grows significantly (>500 products)
- Consider adding search back when:
  - Product count exceeds 500 items
  - Customer feedback requests search feature
  - Analytics show users trying to search

## Tech Stack
- MedusaJS backend (v2.x)
- Next.js storefront (v15.x)
- Node.js/TypeScript
- pnpm package manager
- Railway (Backend services)
- Vercel (Storefront)

## Implementation Request

Please:
1. Analyze current search implementation in the storefront
2. Remove all search UI components (search bar, results, etc.)
3. Remove search functionality and API calls
4. Verify that category filtering, price filtering, and sorting all work correctly
5. Clean up any search-related dependencies
6. Test that navigation and browsing work smoothly without search
7. Provide a summary of what was removed and what filtering/sorting options remain

## Current Status
- ✅ Cloudflare R2 migration complete
- ✅ Postgres search migration complete (backend/admin)
- ⏳ Remove storefront search (in progress)
- ⏳ Remove MeiliSearch service from Railway (pending)