import { Geometry, Point } from '~/models'

// #region Query Options

/**
 * Options for $between query.
 */
export interface BetweenOptions {
  /**
   * Indicates whether the comparison should cover the lower bound or not.
   * If true `$gte`, otherwise `$gt` is used.
   */
  min?: boolean

  /**
   * Indicates whether the comparison should cover the upper bound or not.
   * If true `$lte`, otherwise `$lt` is used.
   */
  max?: boolean
}

/**
 * Options for the $regex query.
 */
export interface RegExOptions {
  /**
   * Chars to remove.
   * If true, default charset will be used.
   */
  remove?: RegExp | boolean

  /**
   * Flags ("igsmyu").
   * The default value is "gi".
   */
  flags?: string
}

// #endregion

// #region Query Selectors

/**
 * Comparison query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-comparison/
 */
export interface ComparisonQuery {
  $eq?: any
  $gt?: number | Date
  $gte?: number | Date
  $in?: any[]
  $lt?: number | Date
  $lte?: number | Date
  $ne?: any
  $nin?: any[]
}

/**
 * Logical query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-logical/
 */
export interface LogicalQuery {
  // eslint-disable-next-line no-use-before-define
  $and?: QuerySelector[]
  $not?: unknown
  // eslint-disable-next-line no-use-before-define
  $nor?: QuerySelector[]
  // eslint-disable-next-line no-use-before-define
  $or?: QuerySelector[]
}

/**
 * Element query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-element/
 */
export interface ElementQuery {
  $exists?: boolean
  $type?: unknown
}

/**
 * Evaluation query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-evaluation/
 */
export interface EvaluationQuery {
  $expr?: unknown
  $jsonSchema?: unknown
  $mod?: [number, number]
  $regex?: RegExp
  $text?: unknown
  $where?: unknown
}

/**
 * GeoSpatial query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-geospatial/
 */
export interface GeoSpatialQuery {
  $geoIntersects?: unknown
  $geoWithin?: {
    $box?: [Point, Point]
    $center?: [Point, number]
  }
  $near?: {
    $geometry: Geometry
    $minDistance: number
    $maxDistance: number
  }
  $nearSphere?: unknown
  $box?: unknown
  $center?: unknown
  $centerSphere?: unknown
  $geometry?: unknown
  $maxDistance?: unknown
  $minDistance?: unknown
  $polygon?: unknown
}

/**
 * Array query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-array/
 */
export interface ArrayQuery {
  $all?: unknown
  $elemMatch?: unknown
  $size?: unknown
}

/**
 * Bitwise query selectors.
 * @see https://docs.mongodb.com/manual/reference/operator/query-bitwise/
 */
export interface BitwiseQuery {
  $bitsAllClear?: unknown
  $bitsAllSet?: unknown
  $bitsAnyClear?: unknown
  $bitsAnySet?: unknown
}

/**
 * Query selector.
 */
export interface QuerySelector
  extends ComparisonQuery,
    LogicalQuery,
    ElementQuery,
    EvaluationQuery,
    GeoSpatialQuery,
    ArrayQuery {
  $comment?: string
}

// #endregion
