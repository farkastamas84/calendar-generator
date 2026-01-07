import LengthUnit from '@/types/LengthUnit'

// Data type for CSS page size
export default class PaperSize {
  name: string = ''
  width: number = 0
  height: number = 0
  unit: LengthUnit = LengthUnit.Millimeter

  constructor(
    name: string,
    width: number,
    height: number,
    unit: LengthUnit = LengthUnit.Millimeter,
  ) {
    this.name = name
    this.width = width
    this.height = height
    this.unit = unit
  }
}
