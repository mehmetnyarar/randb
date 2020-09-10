import { ColorPalette, ColorScheme } from '../types'
import { palette as brand } from './brand'
import { palette as darkPalette } from './dark'
import { palette as lightPalette } from './light'

/**
 * Dark theme color palette.
 */
const dark: ColorPalette = {
  ...darkPalette,
  ...brand // overrite brand colors
}

/**
 * Light theme color palette.
 */
const light: ColorPalette = {
  ...lightPalette,
  ...brand // overrite brand colors
}

/**
 * Color schemes.
 */
export const schemes: Record<ColorScheme, ColorPalette> = {
  dark,
  light
}
