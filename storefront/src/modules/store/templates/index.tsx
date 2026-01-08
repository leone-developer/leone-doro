import { Suspense } from "react"
import { getTags } from "@lib/data/tags"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  tagId,
  priceRange,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  tagId?: string | string[]
  priceRange?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const tags = await getTags()
  const tagIds = tagId ? (Array.isArray(tagId) ? tagId : [tagId]) : undefined

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} tags={tags} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            tagIds={tagIds}
            priceRange={priceRange}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
