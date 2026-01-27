"use client"

import { Table, Text, clx } from "@medusajs/ui"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
}

const Item = ({ item, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant?.product ?? {}

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full" data-testid="product-row">
      {/* Thumbnail */}
      <Table.Cell className="!pl-0 py-4 pr-4 w-20 small:w-24 align-top">
        <LocalizedClientLink
          href={`/produse/${handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "w-16 small:w-20": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.variant?.product?.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      {/* Product Info - includes mobile quantity controls */}
      <Table.Cell className="text-left align-top py-4">
        <Text
          className="txt-medium-plus text-ui-fg-base line-clamp-2 text-sm small:text-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />

        {/* Verighete Configuration Display */}
        {item.metadata?.woman_size && (
          <div className="mt-2 text-xs text-ui-fg-subtle">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-medium text-pink-500">Ea:</span>
                <span>{item.metadata.woman_size}</span>
                <span className="text-ui-fg-muted">•</span>
                <span>{item.metadata.woman_width}</span>
                {item.metadata.woman_engraving && (
                  <span className="text-ui-fg-muted italic ml-1">"{item.metadata.woman_engraving}"</span>
                )}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-medium text-blue-500">El:</span>
                <span>{item.metadata.man_size}</span>
                <span className="text-ui-fg-muted">•</span>
                <span>{item.metadata.man_width}</span>
                {item.metadata.man_engraving && (
                  <span className="text-ui-fg-muted italic ml-1">"{item.metadata.man_engraving}"</span>
                )}
              </div>
            </div>
            {(item.metadata.total_surcharge as number) > 0 && (
              <div className="text-[#D4AF37] mt-1 text-xs font-medium">
                +{new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", minimumFractionDigits: 0 }).format(item.metadata.total_surcharge as number)} (lățime)
              </div>
            )}
          </div>
        )}

        {/* Single ring size display */}
        {item.metadata?.["Marime Inel"] && !item.metadata?.woman_size && (
          <Text className="text-xs text-ui-fg-subtle mt-1">
            Mărime: {item.metadata["Marime Inel"]}
          </Text>
        )}

        {/* Mobile: Quantity controls inline */}
        {type === "full" && (
          <div className="flex small:hidden items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-8 text-sm"
              data-testid="product-select-button"
            >
              {Array.from(
                { length: Math.min(maxQuantity, 10) },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
        )}
        {type === "full" && (
          <ErrorMessage error={error} data-testid="product-error-message" />
        )}
      </Table.Cell>

      {/* Desktop: Quantity controls in separate column */}
      {type === "full" && (
        <Table.Cell className="hidden small:table-cell align-top py-4">
          <div className="flex gap-2 items-center h-6">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-10"
              data-testid="product-select-button"
            >
              {Array.from(
                { length: Math.min(maxQuantity, 10) },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
        </Table.Cell>
      )}

      {/* Desktop: Unit Price */}
      {type === "full" && (
        <Table.Cell className="hidden small:table-cell align-top py-4">
          <div className="h-6 flex items-center">
            <LineItemUnitPrice item={item} style="tight" />
          </div>
        </Table.Cell>
      )}

      {/* Total Price */}
      <Table.Cell className="!pr-0 align-top py-4 text-right">
        <div
          className={clx("h-6 flex items-center justify-end", {
            "h-auto flex-col": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice item={item} style="tight" />
            </span>
          )}
          <LineItemPrice item={item} style="tight" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
