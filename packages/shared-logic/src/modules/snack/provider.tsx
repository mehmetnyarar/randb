import React from 'react'
import { Snack } from './context'
import { SnackOptions } from './types'
import { useSnack } from './use'

interface Props extends SnackOptions {}

/**
 * Snack provider.
 * @param props Props.
 */
export const SnackProvider: React.FC<Props> = ({ children, ...options }) => {
  const snack = useSnack(options)
  return <Snack.Provider value={snack}>{children}</Snack.Provider>
}
