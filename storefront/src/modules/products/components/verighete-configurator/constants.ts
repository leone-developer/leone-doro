export const WOMAN_SIZES = [
  44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58
]

export const MAN_SIZES = [
  54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72
]

export type WidthOption = {
  value: string
  label: string
  surchargePercent: number
}

export const WOMAN_WIDTHS: WidthOption[] = [
  { value: "3", label: "3mm", surchargePercent: 0 },
  { value: "4", label: "4mm", surchargePercent: 8 },
  { value: "5", label: "5mm", surchargePercent: 15 },
]

export const MAN_WIDTHS: WidthOption[] = [
  { value: "4", label: "4mm", surchargePercent: 0 },
  { value: "5", label: "5mm", surchargePercent: 10 },
  { value: "6", label: "6mm", surchargePercent: 18 },
]

export const DEFAULT_WOMAN_WIDTH = "3"
export const DEFAULT_MAN_WIDTH = "4"

export type VerigheteConfig = {
  color: string
  womanSize: string
  womanWidth: string
  womanEngraving: string
  manSize: string
  manWidth: string
  manEngraving: string
}

export type VerigheteMetadata = {
  woman_size: string
  woman_width: string
  woman_width_surcharge: number
  woman_engraving: string
  man_size: string
  man_width: string
  man_width_surcharge: number
  man_engraving: string
  total_surcharge: number
  calculated_total: number
}
