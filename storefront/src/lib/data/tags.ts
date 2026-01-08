import { sdk } from "@lib/config"
import { cache } from "react"
import { HttpTypes } from "@medusajs/types"

export const getTags = cache(async function () {
  return sdk.client.fetch<{ product_tags: HttpTypes.StoreProductTag[] }>("/store/product-tags", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(({ product_tags }) => product_tags)
})
