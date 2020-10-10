import { ColorPalette, ColorScheme } from '../types'

/**
 * Theme context.
 */
export interface ThemeContext {
  ready: boolean
  scheme: ColorScheme
  palette: ColorPalette
  onSchemeChange: (value: ColorScheme) => Promise<void>
}
