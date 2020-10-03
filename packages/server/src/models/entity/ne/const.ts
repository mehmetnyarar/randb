import { CreateQuery } from 'mongoose'
import { ElementType } from './enum'
import { NetworkElement } from './type'

/**
 * Default network element.
 */
export const DEFAULT_NETWORK_ELEMENT: CreateQuery<NetworkElement> = {
  type: ElementType.CELL,
  ID: '',
  name: '',
  network: undefined,
  location: undefined,
  children: undefined,
  isActive: true
}
