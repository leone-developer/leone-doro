"use client"

import { useCallback, useEffect, useState } from "react"
import { Slider } from "@modules/common/components/ui/slider"
import { Text } from "@medusajs/ui"

type PriceRangeSliderProps = {
  minPrice?: number
  maxPrice?: number
  value?: [number, number]
  onChange: (range: [number, number]) => void
}

const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("ro-RO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const PriceRangeSlider = ({
  minPrice = 0,
  maxPrice = 50000,
  value,
  onChange,
}: PriceRangeSliderProps) => {
  const [localValue, setLocalValue] = useState<[number, number]>(
    value || [minPrice, maxPrice]
  )

  useEffect(() => {
    if (value) {
      setLocalValue(value)
    }
  }, [value])

  const handleValueChange = useCallback((newValue: number[]) => {
    setLocalValue([newValue[0], newValue[1]])
  }, [])

  const handleValueCommit = useCallback((newValue: number[]) => {
    onChange([newValue[0], newValue[1]])
  }, [onChange])

  return (
    <div className="flex flex-col gap-y-3">
      <Text className="text-xs uppercase tracking-widest font-serif text-black mb-1">
        Preț
      </Text>
      <div className="px-3">
        <Slider
          min={minPrice}
          max={maxPrice}
          step={100}
          value={localValue}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
        />
      </div>
      <div className="flex justify-between items-center text-sm text-ui-fg-muted px-3">
        <span>{formatPrice(localValue[0])} RON</span>
        <span>{formatPrice(localValue[1])} RON</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
