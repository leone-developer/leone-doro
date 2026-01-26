"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import PriceRangeSlider from "./price-range-slider"
import { clx, Text } from "@medusajs/ui"

type RefinementListProps = {
  sortBy: SortOptions
  hasSubcategories?: boolean
  'data-testid'?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 50000

const RefinementList = ({
  sortBy,
  hasSubcategories = false,
  'data-testid': dataTestId
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  const setPriceRange = (range: [number, number]) => {
    const params = new URLSearchParams(searchParams)

    if (range[0] === DEFAULT_MIN_PRICE && range[1] === DEFAULT_MAX_PRICE) {
      params.delete("price_range")
    } else {
      params.set("price_range", `${range[0]}-${range[1]}`)
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const getPriceRangeFromParams = (): [number, number] => {
    const priceRange = searchParams.get("price_range")
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      return [min || DEFAULT_MIN_PRICE, max || DEFAULT_MAX_PRICE]
    }
    return [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]
  }

  if (hasSubcategories) {
    return null
  }

  return (
    <div className="flex flex-col small:min-w-[250px] small:ml-[1.675rem] small:sticky small:top-24 small:h-fit">
      <div
        className="flex small:hidden py-4 mb-4 border-b border-ui-border-base items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text className="text-sm uppercase tracking-widest text-black font-serif">Filtrare și Sortare</Text>
        <span className="text-xl transition-transform duration-300 text-black" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </div>

      <div className={clx(
        "grid transition-[grid-template-rows] duration-500 ease-in-out small:block",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}>
        <div className="overflow-hidden small:overflow-visible">
          <div className="flex flex-col gap-5 pb-4 mb-4 small:pr-0 pr-4 small:pl-0 pl-0">
            <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />

            <PriceRangeSlider
              minPrice={DEFAULT_MIN_PRICE}
              maxPrice={DEFAULT_MAX_PRICE}
              value={getPriceRangeFromParams()}
              onChange={setPriceRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
