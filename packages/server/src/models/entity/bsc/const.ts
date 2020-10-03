import { CreateQuery } from 'mongoose'
import { DEFAULT_NETWORK_ELEMENT, ElementType, NetworkType } from '../ne'
import { Bsc } from './type'

/**
 * Default BSC.
 */
export const DEFAULT_BSC: CreateQuery<Bsc> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.BSC,
  network: NetworkType.G2,
  children: []
}
