import { CreateQuery } from 'mongoose'
import { DEFAULT_NETWORK_ELEMENT, ElementType, NetworkType } from '../ne'
import { Tac } from './type'

/**
 * Default TAC.
 */
export const DEFAULT_TAC: CreateQuery<Tac> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.TAC,
  network: NetworkType.G4,
  children: []
}
