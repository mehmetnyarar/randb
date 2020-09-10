import { useCallback, useState } from 'react'
import { ColorPalette, ColorScheme } from '../types'
import { getColorPalette } from '../utility'
import { ThemeContext } from './types'

// #region Types

export interface UseThemeOptions {
  scheme?: ColorScheme
}

export interface UseTheme {
  (options?: UseThemeOptions): ThemeContext
}

// #endregion

/**
 * Theme hook.
 */
export const useTheme: UseTheme = (options = {}) => {
  const [scheme, setScheme] = useState<ColorScheme>(options.scheme || 'light')
  const [palette, setPalette] = useState<ColorPalette>(getColorPalette(scheme))
  const changeScheme = useCallback((scheme: ColorScheme) => {
    setScheme(scheme)
    setPalette(getColorPalette(scheme))
  }, [])

  return {
    scheme,
    palette,
    changeScheme
  }
}
