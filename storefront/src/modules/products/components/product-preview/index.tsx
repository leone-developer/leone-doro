import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink
      href={`/produse/${product.handle}`}
      className="group block h-full w-full"
    >
      {/* 
        1. Thumbnail Wrapper 
        - We pass 'images={product.images}' to enable the hover effect 
        - The aspect ratio is handled inside Thumbnail, but we ensure full width here 
      */}
      <div className="w-full relative overflow-hidden">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="rounded-none" // Hard corners = Luxury
        />
        
        {/* Optional: Add a subtle overlay or badge here if needed in future */}
      </div>

      {/* 
        2. Text Content 
        - Left alignment for Gallery style
        - Serif font for Title
        - Gold accent on hover
      */}
      <div className="flex flex-col mt-4 space-y-1">
        <Text 
          className="font-serif text-base text-gray-900 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2"
          style={{ letterSpacing: '0.02em' }}
        >
          {product.title}
        </Text>
        
        <div className="flex items-center gap-x-2">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
