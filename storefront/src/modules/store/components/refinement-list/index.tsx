"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import FilterCheckboxGroup from "@modules/common/components/filter-checkbox-group"
import { HttpTypes } from "@medusajs/types"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { clx, Text } from "@medusajs/ui"

type RefinementListProps = {
  sortBy: SortOptions
  tags?: HttpTypes.StoreProductTag[]
  search?: boolean
  'data-testid'?: string
}

const priceOptions = [
  {
    value: "0-100",
    label: "Sub 100 RON",
  },
  {
    value: "100-250",
    label: "100 - 250 RON",
  },
  {
    value: "250-500",
    label: "250 - 500 RON",
  },
  {
    value: "500-1000",
    label: "500 - 1000 RON",
  },
  {
    value: "1000-2500",
    label: "1000 - 2500 RON",
  },
  {
    value: "2500-100000",
    label: "2500+ RON",
  },
]

const RefinementList = ({ sortBy, tags, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const setPriceParam = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === params.get("price_range")) {
      params.delete("price_range")
    } else {
      params.set("price_range", value)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleTag = (id: string) => {
    const params = new URLSearchParams(searchParams)
    const currentTags = params.getAll("tag_id")
    
    // We need to clear all and re-append to avoid duplicates cleanly or just manipulate
    params.delete("tag_id")
    
    if (currentTags.includes(id)) {
      currentTags.filter(t => t !== id).forEach(t => params.append("tag_id", t))
    } else {
      [...currentTags, id].forEach(t => params.append("tag_id", t))
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // --- Grouping Logic Start ---
  // We assume tags might be named "Material: Gold", "Gemstone: Ruby" etc. 
  // OR we just group them purely by value if no prefix exists, 
  // BUT for a better UX, explicit groups are derived from prefixes.
  
  const groupedTags = (tags || []).reduce((acc, t) => {
    const parts = t.value.split(":")
    if (parts.length > 1) {
      const group = parts[0].trim()
      const label = parts[1].trim()
      
      if (!acc[group]) acc[group] = []
      acc[group].push({ value: t.id, label: label })
    } else {
      // Tags without prefix go to "Other" or "Filters"
      if (!acc["Filters"]) acc["Filters"] = []
      acc["Filters"].push({ value: t.id, label: t.value })
    }
    return acc
  }, {} as Record<string, { value: string, label: string }[]>)

  const selectedTags = searchParams.getAll("tag_id")
  const selectedPrice = searchParams.get("price_range") || undefined
  const [isOpen, setIsOpen] = useState(false)

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
            
            {Object.entries(groupedTags).map(([groupTitle, items]) => (
              <FilterCheckboxGroup
                  key={groupTitle}
                  title={groupTitle}
                  items={items}
                  selectedValues={selectedTags}
                  handleChange={toggleTag}
              />
            ))}

            <FilterRadioGroup
                title="Preț"
                items={priceOptions}
                value={selectedPrice}
                handleChange={setPriceParam}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
