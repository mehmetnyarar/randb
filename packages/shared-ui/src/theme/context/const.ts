import { getColorPalette } from '../utility'
import { ThemeContext } from './types'

/**
 * Default context.
 */
export const DEFAULT_THEME: ThemeContext = {
  scheme: 'light',
  palette: getColorPalette('light'),
  changeScheme: () => {
    throw new Error('"ThemeContext/changeScheme" is not implemented!')
  }
}
