import { CreateQuery } from 'mongoose'
import { DEFAULT_NETWORK_ELEMENT, ElementType, NetworkType } from '../ne'
import { Rnc } from './type'

/**
 * Default RNC.
 */
export const DEFAULT_RNC: CreateQuery<Rnc> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.RNC,
  network: NetworkType.G3,
  children: []
}
