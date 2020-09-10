import React from 'react'
import { Theme } from './context'
import { useTheme } from './use'

/**
 * Props for ThemeProvider.
 */
export interface ThemeProviderProps {}

/**
 * Theme provider.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useTheme()
  return <Theme.Provider value={theme}>{children}</Theme.Provider>
}
