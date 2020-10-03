import { CreateQuery } from 'mongoose'
import { GeometryType } from '~/models/embed'
import { DEFAULT_NETWORK_ELEMENT, ElementType } from '../ne'
import { Site } from './type'

/**
 * Default site.
 */
export const DEFAULT_SITE: CreateQuery<Site> = {
  ...DEFAULT_NETWORK_ELEMENT,
  type: ElementType.SITE,
  location: {
    type: GeometryType.Point,
    coordinates: []
  },
  children: [],
  g2: [],
  g3: [],
  g4: []
}
