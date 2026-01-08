import { clx, Text } from "@medusajs/ui"
import { Label } from "@modules/common/components/ui/label"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Text className="text-xs uppercase tracking-widest font-serif text-black mb-1">
        {title}
      </Text>
      <div
        data-testid={dataTestId}
        className="flex flex-col gap-y-1"
        role="radiogroup"
      >
        {items?.map((i) => (
          <button
            key={i.value}
            type="button"
            className="flex items-center text-left"
            onClick={() => handleChange(i.value)}
            role="radio"
            aria-checked={i.value === value ? "true" : "false"}
          >
            <Label
              htmlFor={i.value}
              className={clx(
                "text-sm cursor-pointer transition-all duration-200",
                {
                  "text-black font-medium underline decoration-[#D4AF37] underline-offset-4": i.value === value,
                  "text-ui-fg-muted hover:text-black": i.value !== value,
                }
              )}
            >
              {i.label}
            </Label>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterRadioGroup
