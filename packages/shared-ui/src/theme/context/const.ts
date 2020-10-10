import { ColorScheme } from '../types'
import { getColorPalette } from '../utility'
import { ThemeContext } from './types'

/**
 * Default scheme.
 */
export const DEFAULT_SCHEME: ColorScheme = 'dark'

/**
 * Default context.
 */
export const DEFAULT_THEME: ThemeContext = {
  ready: false,
  scheme: DEFAULT_SCHEME,
  palette: getColorPalette(DEFAULT_SCHEME),
  onSchemeChange: () => {
    throw new Error('"ThemeContext/onSchemeChange" is not implemented!')
  }
}
