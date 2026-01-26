"use client"

import { Button, clx, Text } from "@medusajs/ui"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { isEqual } from "lodash"
import { HttpTypes } from "@medusajs/types"
import { toast } from "sonner"

import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import {
  WOMAN_SIZES,
  MAN_SIZES,
  WOMAN_WIDTHS,
  MAN_WIDTHS,
  DEFAULT_WOMAN_WIDTH,
  DEFAULT_MAN_WIDTH,
  WidthOption,
  VerigheteMetadata,
} from "./constants"

type VerigheteConfiguratorProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

const formatPrice = (amount: number, currencyCode: string): string => {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Ring icon component
const RingIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="5" />
  </svg>
)

const VerigheteConfigurator = ({
  product,
  region,
  disabled,
}: VerigheteConfiguratorProps) => {
  const countryCode = useParams().countryCode as string

  // Variant selection (for color)
  const [options, setOptions] = useState<Record<string, string | undefined>>({})

  // Woman configuration
  const [womanSize, setWomanSize] = useState<string>("")
  const [womanWidth, setWomanWidth] = useState<string>(DEFAULT_WOMAN_WIDTH)
  const [womanEngraving, setWomanEngraving] = useState<string>("")

  // Man configuration
  const [manSize, setManSize] = useState<string>("")
  const [manWidth, setManWidth] = useState<string>(DEFAULT_MAN_WIDTH)
  const [manEngraving, setManEngraving] = useState<string>("")

  const [isAdding, setIsAdding] = useState(false)

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // Get base price from selected variant
  const { variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  const basePrice = variantPrice?.calculated_price_number || 0
  const currencyCode = variantPrice?.currency_code || region.currency_code || "RON"

  // Calculate surcharges
  const womanWidthOption = WOMAN_WIDTHS.find((w) => w.value === womanWidth)
  const manWidthOption = MAN_WIDTHS.find((w) => w.value === manWidth)

  const womanSurcharge = Math.round(basePrice * (womanWidthOption?.surchargePercent || 0) / 100)
  const manSurcharge = Math.round(basePrice * (manWidthOption?.surchargePercent || 0) / 100)
  const totalSurcharge = womanSurcharge + manSurcharge
  const totalPrice = basePrice + totalSurcharge

  // Validation
  const isConfigValid = useMemo(() => {
    return (
      selectedVariant &&
      womanSize &&
      womanWidth &&
      manSize &&
      manWidth
    )
  }, [selectedVariant, womanSize, womanWidth, manSize, manWidth])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || !isConfigValid) return

    setIsAdding(true)

    const metadata: VerigheteMetadata = {
      woman_size: womanSize,
      woman_width: `${womanWidth}mm`,
      woman_width_surcharge: womanSurcharge,
      woman_engraving: womanEngraving || "",
      man_size: manSize,
      man_width: `${manWidth}mm`,
      man_width_surcharge: manSurcharge,
      man_engraving: manEngraving || "",
      total_surcharge: totalSurcharge,
      calculated_total: totalPrice,
    }

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata,
    })

    toast.success("Verighete adăugate în coș", {
      description: `${product.title} - ${selectedVariant.title}`,
      action: {
        label: "Vezi coșul",
        onClick: () => (window.location.href = "/cart"),
      },
    })

    setIsAdding(false)
  }

  // Width button component for cleaner code
  const WidthButton = ({
    width,
    selected,
    onClick,
  }: {
    width: WidthOption
    selected: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      disabled={!!disabled || isAdding}
      className={clx(
        "relative min-w-[60px] px-3 py-2.5 text-sm border rounded-lg transition-all duration-200",
        "flex flex-col items-center justify-center gap-0.5",
        {
          "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-[#D4AF37]/5 text-black shadow-sm": selected,
          "border-gray-200 hover:border-[#D4AF37]/50 hover:bg-gray-50 text-gray-700": !selected,
        }
      )}
    >
      <span className="font-medium">{width.label}</span>
      {width.surchargePercent > 0 && (
        <span className={clx("text-[10px]", selected ? "text-[#B8960C]" : "text-gray-400")}>
          +{width.surchargePercent}%
        </span>
      )}
    </button>
  )

  // Configuration card component
  const ConfigCard = ({
    title,
    icon,
    sizes,
    selectedSize,
    onSizeChange,
    widths,
    selectedWidth,
    onWidthChange,
    engraving,
    onEngravingChange,
    placeholder,
  }: {
    title: string
    icon: "woman" | "man"
    sizes: number[]
    selectedSize: string
    onSizeChange: (size: string) => void
    widths: WidthOption[]
    selectedWidth: string
    onWidthChange: (width: string) => void
    engraving: string
    onEngravingChange: (text: string) => void
    placeholder: string
  }) => (
    <div className="flex flex-col gap-4 p-4 sm:p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 pb-3 border-b border-gray-100">
        <RingIcon className={clx("w-5 h-5", icon === "woman" ? "text-pink-400" : "text-blue-400")} />
        <h3 className="text-base font-serif font-semibold text-gray-900">{title}</h3>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Mărime
        </label>
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)}
          disabled={!!disabled || isAdding}
          className={clx(
            "w-full px-3 py-2.5 border rounded-lg text-sm appearance-none",
            "bg-white bg-no-repeat bg-right",
            "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]",
            "transition-all duration-200",
            selectedSize ? "border-gray-300 text-gray-900" : "border-gray-200 text-gray-400"
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundSize: "20px",
            backgroundPosition: "right 10px center",
            paddingRight: "36px",
          }}
        >
          <option value="">Selectează</option>
          {sizes.map((size) => (
            <option key={size} value={size.toString()}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Width */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Lățime
        </label>
        <div className="grid grid-cols-3 gap-2">
          {widths.map((width) => (
            <WidthButton
              key={width.value}
              width={width}
              selected={selectedWidth === width.value}
              onClick={() => onWidthChange(width.value)}
            />
          ))}
        </div>
      </div>

      {/* Engraving */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Gravură <span className="font-normal text-gray-400">(opțional)</span>
        </label>
        <input
          type="text"
          value={engraving}
          onChange={(e) => onEngravingChange(e.target.value)}
          disabled={!!disabled || isAdding}
          placeholder={placeholder}
          maxLength={30}
          className={clx(
            "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm",
            "placeholder:text-gray-300",
            "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]",
            "transition-all duration-200"
          )}
        />
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Color Selection */}
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Culoare Aur
          </label>
          <div className="flex flex-wrap gap-2">
            {product.options?.map((option) =>
              option.values?.map((value: any) => (
                <button
                  key={value.id}
                  onClick={() => setOptionValue(option.title ?? "", value.value)}
                  disabled={!!disabled || isAdding}
                  className={clx(
                    "px-4 py-2.5 text-sm font-medium border rounded-lg transition-all duration-200",
                    {
                      "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-[#D4AF37]/5 text-black shadow-sm":
                        options[option.title ?? ""] === value.value,
                      "border-gray-200 hover:border-[#D4AF37]/50 hover:bg-gray-50 text-gray-600":
                        options[option.title ?? ""] !== value.value,
                    }
                  )}
                >
                  {value.value}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 gap-4">
        <ConfigCard
          title="Pentru Ea"
          icon="woman"
          sizes={WOMAN_SIZES}
          selectedSize={womanSize}
          onSizeChange={setWomanSize}
          widths={WOMAN_WIDTHS}
          selectedWidth={womanWidth}
          onWidthChange={setWomanWidth}
          engraving={womanEngraving}
          onEngravingChange={setWomanEngraving}
          placeholder="Ex: Pentru totdeauna"
        />

        <ConfigCard
          title="Pentru El"
          icon="man"
          sizes={MAN_SIZES}
          selectedSize={manSize}
          onSizeChange={setManSize}
          widths={MAN_WIDTHS}
          selectedWidth={manWidth}
          onWidthChange={setManWidth}
          engraving={manEngraving}
          onEngravingChange={setManEngraving}
          placeholder="Ex: Te iubesc"
        />
      </div>

      {/* Price Breakdown */}
      {selectedVariant && basePrice > 0 && (
        <div className="flex flex-col gap-2 p-4 bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-xl">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Preț de bază (set):</span>
            <span className="text-gray-700">{formatPrice(basePrice, currencyCode)}</span>
          </div>
          {womanSurcharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Lățime Ea ({womanWidth}mm):
              </span>
              <span className="text-gray-700">+{formatPrice(womanSurcharge, currencyCode)}</span>
            </div>
          )}
          {manSurcharge > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Lățime El ({manWidth}mm):
              </span>
              <span className="text-gray-700">+{formatPrice(manSurcharge, currencyCode)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline pt-3 mt-1 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">Total set verighete:</span>
            <span className="text-xl font-serif font-semibold text-[#B8960C]">
              {formatPrice(totalPrice, currencyCode)}
            </span>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={!isConfigValid || !!disabled || isAdding}
        variant="primary"
        className={clx(
          "w-full h-12 text-base font-medium rounded-lg transition-all duration-200",
          isConfigValid && !disabled && !isAdding
            ? "bg-[#D4AF37] hover:bg-[#B8960C] text-white shadow-md hover:shadow-lg"
            : ""
        )}
        isLoading={isAdding}
        data-testid="add-verighete-button"
      >
        {!selectedVariant
          ? "Selectează culoarea aurului"
          : !womanSize || !manSize
          ? "Selectează mărimile"
          : "Adaugă în coș"}
      </Button>

      {/* Help text */}
      <p className="text-xs text-center text-gray-400">
        Nu știi mărimea? Vizitează-ne în magazin pentru măsurare gratuită.
      </p>
    </div>
  )
}

export default VerigheteConfigurator
