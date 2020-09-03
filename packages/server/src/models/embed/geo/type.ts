import { Prop } from '@typegoose/typegoose'
import { Field, Float, ObjectType } from 'type-graphql'
import { EmbedModel } from '../options'
import { GeometryType } from './enum'
import { Coordinates, LineString, Point, Polygon } from './types'

/**
 * Geolocation.
 */
@ObjectType()
@EmbedModel()
export class GeoLocation {
  /**
   * Longitude.
   */
  @Field(() => Float)
  @Prop({ required: true })
  x!: number

  /**
   * Latitude.
   */
  @Field(() => Float)
  @Prop({ required: true })
  y!: number

  /**
   * Date of record.
   */
  @Field({ nullable: true })
  @Prop()
  date?: Date
}

// #region GeoJSON

/**
 * Geometry.
 * @see https://docs.mongodb.com/manual/reference/geojson/
 */
export class Geometry {
  @Prop({ enum: GeometryType, type: String, required: true })
  type!: GeometryType

  @Prop({ type: Number, default: [] })
  coordinates!: Coordinates
}

/**
 * GeoJSON/Point.
 */
@EmbedModel()
export class GeoPoint extends Geometry {
  @Prop({ enum: GeometryType, type: String, default: GeometryType.Point })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: Point
}

/**
 * GeoJSON/LineString.
 */
@EmbedModel()
export class GeoLineString extends Geometry {
  @Prop({ enum: GeometryType, type: String, default: GeometryType.LineString })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: LineString
}

/**
 * GeoJSON/Polygon.
 */
@EmbedModel()
export class GeoPolygon extends Geometry {
  @Prop({ enum: GeometryType, type: String, default: GeometryType.Polygon })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: Polygon
}

/**
 * GeoJSON/MultiPoint.
 */
@EmbedModel()
export class GeoMultiPoint {
  @Prop({ enum: GeometryType, type: String, default: GeometryType.MultiPoint })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: Point[]
}

/**
 * GeoJSON/MultiLineString.
 */
@EmbedModel()
export class GeoMultiLineString {
  @Prop({
    enum: GeometryType,
    type: String,
    default: GeometryType.MultiLineString
  })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: LineString[]
}

/**
 * GeoJSON/MultiPolygon.
 */
@EmbedModel()
export class GeoMultiPolygon {
  @Prop({
    enum: GeometryType,
    type: String,
    default: GeometryType.MultiPolygon
  })
  type!: GeometryType

  @Prop({ default: [] })
  coordinates!: Polygon[]
}

/**
 * GeoJSON/GeometryCollection.
 */
@EmbedModel()
export class GeometryCollection {
  @Prop({
    enum: GeometryType,
    type: String,
    default: GeometryType.GeometryCollection
  })
  type!: GeometryType

  @Prop({ default: [] })
  geometries!: Geometry[]
}

// #endregion
