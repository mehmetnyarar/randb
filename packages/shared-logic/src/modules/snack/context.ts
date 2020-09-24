import { createContext } from 'react'
import { SnackContext } from './types'

/**
 * Default value for the snack context.
 */
export const DEFAULT_SNACK: SnackContext = {
  message: undefined,
  show: () => {
    throw new Error('snack/show has not been implemented yet!')
  },
  hide: () => {
    throw new Error('snack/hide has not been implemented yet!')
  }
}

/**
 * Snack context.
 */
export const Snack = createContext<SnackContext>(DEFAULT_SNACK)
