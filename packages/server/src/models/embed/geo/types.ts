/**
 * Point is [longitude, latitude].
 * Valid longitude values are between -180 and 180, both inclusive.
 * Valid latitude values are between -90 and 90, both inclusive.
 */
export type Point = [number, number]

/**
 * LineString.
 */
export type LineString = Point[]

/**
 * LinearRing.
 * At least 4 Points required.
 * First and last points must match.
 */
export type LinearRing = Point[]

/**
 * Polygon.
 */
export type Polygon = LinearRing[]

/**
 * Coordinates.
 */
export type Coordinates =
  | Point
  | LineString
  | Polygon
  | Point[] // MultiPoint
  | LineString[] // MultiLineString
  | Polygon[] // MultiPolygon
