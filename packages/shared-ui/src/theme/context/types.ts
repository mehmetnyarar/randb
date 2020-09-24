import { ColorPalette, ColorScheme } from '../types'

/**
 * Theme context.
 */
export interface ThemeContext {
  scheme: ColorScheme
  palette: ColorPalette
  onSchemeChange: (value: ColorScheme) => Promise<void>
}
