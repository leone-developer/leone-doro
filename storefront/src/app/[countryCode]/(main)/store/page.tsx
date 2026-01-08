import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    tag_id?: string | string[]
    price_range?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage({ searchParams, params }: Params) {
  const { sortBy, page, tag_id, price_range } = await searchParams
  const { countryCode } = await params
  
  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      tagId={tag_id}
      priceRange={price_range}
      countryCode={countryCode}
    />
  )
}
