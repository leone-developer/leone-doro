"use client"

import { clx, Text } from "@medusajs/ui"
import { Label } from "@modules/common/components/ui/label"

type FilterCheckboxGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  selectedValues: string[]
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterCheckboxGroup = ({
  title,
  items,
  selectedValues,
  handleChange,
  "data-testid": dataTestId,
}: FilterCheckboxGroupProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Text className="text-xs uppercase tracking-widest font-serif text-black mb-1">
        {title}
      </Text>
      <div data-testid={dataTestId} className="flex flex-col gap-y-1">
        {items?.map((i) => {
          const isSelected = selectedValues.includes(i.value)
          return (
            <button
              key={i.value}
              type="button"
              className="flex items-center text-left w-fit"
              onClick={() => handleChange(i.value)}
              role="checkbox"
              aria-checked={isSelected}
            >
              <Label
                htmlFor={i.value}
                className={clx(
                  "text-sm cursor-pointer transition-all duration-200",
                  {
                    "text-black font-medium underline decoration-[#D4AF37] underline-offset-4": isSelected,
                    "text-ui-fg-muted hover:text-black": !isSelected,
                  }
                )}
              >
                {i.label}
              </Label>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterCheckboxGroup
