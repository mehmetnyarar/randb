import { createContext } from 'react'
import { DEFAULT_NETWORK } from './const'
import { NetworkContext } from './types'

/**
 * Network context.
 */
export const Network = createContext<NetworkContext>(DEFAULT_NETWORK)
