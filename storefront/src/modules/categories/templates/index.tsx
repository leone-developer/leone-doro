import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import CategoryCard from "../../home/components/featured-categories/category-card"

// Helper to map category handles to local images (Added for Category Template)
const categoryImages: Record<string, string> = {
  "inele": "/images/inele.webp",
  "coliere": "/images/coliere.webp",
  "cercei": "/images/cercei.webp",
  "bratari": "/images/bratari.webp",
  "verighete": "/images/golden-hero.webp",
  "inele-de-logodna": "/images/golden-hero.webp",
  "bijuterii": "/images/golden-hero.webp",
}

export default async function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
  priceRange,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  priceRange?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)
  const hasSubcategories = category.category_children && category.category_children.length > 0

  if (!category || !countryCode) notFound()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="hidden small:block">
        <RefinementList sortBy={sort} hasSubcategories={hasSubcategories} data-testid="sort-by-container" />
      </div>
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4 items-end">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle flex items-center">
                <LocalizedClientLink
                  className="mr-2 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                <span className="mr-2">/</span>
              </span>
            ))}
          <h1 data-testid="category-page-title" className="text-3xl font-serif text-gray-900">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        
        <div className="block small:hidden mb-6">
           <RefinementList sortBy={sort} hasSubcategories={hasSubcategories} data-testid="sort-by-container-mobile" />
        </div>

        {category.category_children && (
          <div className="mb-10 w-full">
            <ul className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-6">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <CategoryCard 
                      category={c} 
                      image={categoryImages[c.handle] || "/images/golden-hero.webp"} 
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
            priceRange={priceRange}
          />
        </Suspense>
      </div>
    </div>
  )
}
