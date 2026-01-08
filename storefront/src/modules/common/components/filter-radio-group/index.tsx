import { Label } from "@modules/common/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@modules/common/components/ui/radio-group"

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
    <div className="flex gap-x-3 flex-col gap-y-3">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <RadioGroup
        data-testid={dataTestId}
        value={value}
        onValueChange={handleChange}
      >
        {items?.map((i) => (
          <div key={i.value} className="flex items-center space-x-2">
            <RadioGroupItem value={i.value} id={i.value} />
            <Label
              htmlFor={i.value}
              className="text-sm font-normal cursor-pointer text-foreground"
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
