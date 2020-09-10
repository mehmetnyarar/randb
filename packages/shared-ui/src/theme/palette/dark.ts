import { dark } from '@eva-design/eva'
import { BasicColorPalette, ColorPalette, MappedColorPalette } from '../types'

const basic: Partial<BasicColorPalette> = {}
const mapped: Partial<MappedColorPalette> = {}

/**
 * Dark color palette.
 */
export const palette: ColorPalette = {
  ...dark,
  ...basic,
  ...mapped
}
