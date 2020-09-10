import { light } from '@eva-design/eva'
import { BasicColorPalette, ColorPalette, MappedColorPalette } from '../types'

const basic: Partial<BasicColorPalette> = {}
const mapped: Partial<MappedColorPalette> = {}

/**
 * Light color palette.
 */
export const palette: ColorPalette = {
  ...light,
  ...basic,
  ...mapped
}
