"use client"

import { useState } from "react"
import { IconRulerMeasure } from "@tabler/icons-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/ui/select"

// Standard EU Ring Sizes
const RING_SIZES = [
  "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "64"
]

type RingSizeSelectorProps = {
  selectedSize: string | null
  onSizeChange: (size: string) => void
  onOpenGuide?: () => void
}

export default function RingSizeSelector({ 
  selectedSize, 
  onSizeChange,
  onOpenGuide 
}: RingSizeSelectorProps) {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-600">
          Selectează Mărimea
        </label>
        
        {/* Size Guide Link */}
        <button 
          type="button"
          onClick={onOpenGuide}
          className="flex items-center gap-1 text-xs text-[#D4AF37] hover:text-black transition-colors"
        >
          <IconRulerMeasure size={14} stroke={1.5} />
          Ghid de Mărimi
        </button>
      </div>

      <Select value={selectedSize || ""} onValueChange={onSizeChange}>
        <SelectTrigger 
          className="w-full h-12 px-4 border-gray-200 bg-white text-gray-900 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
        >
          <SelectValue placeholder="Alege mărimea inelului" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {RING_SIZES.map((size) => (
            <SelectItem key={size} value={size}>
              EU {size}
            </SelectItem>
          ))}
          <SelectItem value="consultanta" className="font-medium">
            Nu știu mărimea (Voi fi contactat)
          </SelectItem>
        </SelectContent>
      </Select>

      {selectedSize === "consultanta" && (
        <p className="text-xs text-gray-500 italic">
          Vei fi contactat de echipa noastră pentru a determina mărimea potrivită.
        </p>
      )}
    </div>
  )
}