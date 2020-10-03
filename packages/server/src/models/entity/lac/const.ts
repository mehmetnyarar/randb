import { CreateQuery } from 'mongoose'
import { DEFAULT_NETWORK_ELEMENT, ElementType } from '../ne'
import { Lac } from './type'

/**
 * Default LAC.
 */
export const DEFAULT_LAC: CreateQuery<Lac> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.LAC,
  children: []
}
