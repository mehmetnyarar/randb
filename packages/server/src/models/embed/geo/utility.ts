import { GeometryType } from './enum'
import { GeoLocation, Geometry, GeoPoint } from './type'
import { Coordinates, Point } from './types'

/**
 * Transforms coordinates to GeoPoint.
 * @param x Longitude.
 * @param y Latitude.
 * @returns GeoPoint.
 */
export const toGeoPoint = (x: number, y: number): GeoPoint => {
  return {
    type: GeometryType.Point,
    coordinates: [x, y]
  }
}

/**
 * Transforms coordinates to GeoLocation.
 * @param value Coordinates.
 * @returns Point.
 */
export const toPoint = (value: Coordinates) => {
  if (!Array.isArray(value)) return undefined
  if (value.length !== 2) return undefined

  const isValid = (value as any[]).reduce((result, value) => {
    if (result && typeof value !== 'number') return false
    return result
  }, true)

  return isValid ? (value as Point) : undefined
}

/**
 * Transforms Point to GeoLocation.
 * @param geometry Point.
 * @returns GeoLocation.
 */
export const toGeoLocation = (geometry: Geometry): GeoLocation | undefined => {
  const { type } = geometry
  if (type !== GeometryType.Point) return undefined

  const { coordinates } = geometry
  const point = toPoint(coordinates)
  if (!point) return undefined

  return {
    x: point[0],
    y: point[1]
  }
}
