"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import RingSizeSelector from "../ring-size-selector"
import Modal from "@modules/common/components/modal"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { toast } from "sonner"

type ProductActionsProps = {
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

const ProductActions = ({
  product,
  region,
  disabled,
}: ProductActionsProps) => {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [ringSize, setRingSize] = useState<string | null>(null)
  const countryCode = useParams().countryCode as string

  // Check if product is a ring based on metadata
  const isRing = useMemo(() => {
    return product.type?.value?.toLowerCase() === "ring" || 
           product.tags?.some(tag => tag.value?.toLowerCase() === "ring" || tag.value?.toLowerCase() === "inel") ||
           product.categories?.some(cat => cat.name?.toLowerCase().includes("inele") || cat.name?.toLowerCase().includes("verighete")) ||
           product.subtitle?.toLowerCase().includes("inel") ||
           product.title?.toLowerCase().includes("inel") ||
           product.title?.toLowerCase().includes("verighet")
  }, [product])

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

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    if (isRing && !ringSize) {
      // Don't add if ring size is mandatory but not selected
      // You might want to add error state or toast here
      return
    }

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata: isRing && ringSize ? { "Marime Inel": ringSize } : undefined
    })

    toast.success("Produs adăugat în coș", {
      description: `${product.title} - ${selectedVariant.title}`,
      action: {
         label: "Vezi coșul",
         onClick: () => window.location.href = "/cart"
      }
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                const title = option.title ?? ""
                // Don't render size option specifically if we handle it separately, 
                // but checking metadata approach means we mostly rely on isRing check.
                // Keeping clean option rendering.
                
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.title ?? ""]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
          
          {isRing && (
             <div className="mb-4">
                <RingSizeSelector 
                  selectedSize={ringSize} 
                  onSizeChange={setRingSize} 
                  onOpenGuide={() => setShowSizeGuide(true)} 
                />
             </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding || (isRing && !ringSize)}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Selectează varianta"
            : !inStock
            ? "Stoc epuizat"
            : (isRing && !ringSize) 
              ? "Selectează mărimea" 
              : "Adaugă în coș"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
          onOpenGuide={() => setShowSizeGuide(true)}
          isRing={isRing}
          ringSize={ringSize}
          setRingSize={setRingSize}
        />
      </div>

      <Modal isOpen={showSizeGuide} close={() => setShowSizeGuide(false)}>
        <div className="flex flex-col gap-y-4 p-4 text-center">
           <h2 className="text-xl font-medium font-serif">Ghid de Mărimi</h2>
           <p className="text-gray-600">
             Aici va fi tabelul cu mărimile inelelor (diametru interior vs circumferință).
           </p>
           <button 
             onClick={() => setShowSizeGuide(false)}
             className="mt-4 text-sm underline text-gray-500"
           >
             Închide
           </button>
        </div>
      </Modal>
    </>
  )
}

export default ProductActions
