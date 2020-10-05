import React from 'react'
import { Network } from './context'
import { NetworkOptions } from './types'
import { useNetwork } from './use-network'

interface Props extends NetworkOptions {}

/**
 * Network provider.
 * @param props Props.
 */
export const NetworkProvider: React.FC<Props> = ({ children }) => {
  const value = useNetwork()
  return <Network.Provider value={value}>{children}</Network.Provider>
}
