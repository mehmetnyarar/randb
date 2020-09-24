import { ReactNode } from 'react'

/**
 * Type of snack.
 */
export type SnackType = 'info' | 'success' | 'warning' | 'error'

/**
 * Snack message.
 */
export interface SnackMessage {
  type?: SnackType
  title?: string
  content: string | ReactNode
}

/**
 * Options for snack.
 */
export interface SnackOptions {
  autoCloseAfter?: number
}

/**
 * Snack context.
 */
export interface SnackContext {
  message?: SnackMessage

  show: (message: SnackMessage, options?: SnackOptions) => void

  hide: () => void
}
