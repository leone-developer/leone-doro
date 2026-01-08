"use client"

import { Label } from "@modules/common/components/ui/label"
import { Checkbox } from "@modules/common/components/ui/checkbox"

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
    <div className="flex gap-x-3 flex-col gap-y-3">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div data-testid={dataTestId} className="flex flex-col gap-y-3">
        {items?.map((i) => {
          const isSelected = selectedValues.includes(i.value)
          return (
            <div
              key={i.value}
              className="flex items-center space-x-2"
            >
              <Checkbox
                checked={isSelected}
                id={i.value}
                onCheckedChange={() => handleChange(i.value)}
              />
              <Label
                htmlFor={i.value}
                className="text-sm font-normal cursor-pointer text-foreground"
              >
                {i.label}
              </Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterCheckboxGroup
