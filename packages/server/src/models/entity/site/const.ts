import { CreateQuery } from 'mongoose'
import { GeometryType } from '~/models/embed'
import { Site } from './type'

/**
 * Default site.
 */
export const DEFAULT_SITE: CreateQuery<Site> = {
  ID: '',
  name: '',
  location: {
    type: GeometryType.Point,
    coordinates: []
  },
  cells2g: [],
  cells3g: [],
  cells4g: [],
  isActive: true
}
