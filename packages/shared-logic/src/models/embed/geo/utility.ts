import { GeoLocation } from '../../../graphql'

/**
 * Stringifies a GeoLocation.
 * @param [location] Location.
 * @returns Stringified location.
 */
export const getLocation = (location?: GeoLocation) => {
  return location ? `${location.x}, ${location.y}` : ''
}
