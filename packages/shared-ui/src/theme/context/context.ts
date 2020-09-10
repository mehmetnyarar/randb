import { createContext } from 'react'
import { DEFAULT_THEME } from './const'
import { ThemeContext } from './types'

/**
 * Theme.
 */
const Theme = createContext<ThemeContext>(DEFAULT_THEME)
Theme.displayName = 'Theme'

export { Theme }
