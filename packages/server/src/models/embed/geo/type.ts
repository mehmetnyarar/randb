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
@EmbedModel(true, 0)
export class Geometry {
  @Prop({ enum: GeometryType, type: String, required: true })
  type!: GeometryType

  @Prop({ required: true })
  coordinates!: Coordinates
}

/**
 * GeoJSON/Point.
 */
@EmbedModel(true, 0)
export class GeoPoint extends Geometry {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.Point

  @Prop({ required: true })
  coordinates!: Point
}

/**
 * GeoJSON/LineString.
 */
@EmbedModel(true, 0)
export class GeoLineString extends Geometry {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.LineString

  @Prop({ required: true })
  coordinates!: LineString
}

/**
 * GeoJSON/Polygon.
 */
@EmbedModel(true, 0)
export class GeoPolygon extends Geometry {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.Polygon

  @Prop({ required: true })
  coordinates!: Polygon
}

/**
 * GeoJSON/MultiPoint.
 */
@EmbedModel(true, 0)
export class GeoMultiPoint {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.MultiPoint

  @Prop({ required: true })
  coordinates!: Point[]
}

/**
 * GeoJSON/MultiLineString.
 */
@EmbedModel(true, 0)
export class GeoMultiLineString {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.MultiLineString

  @Prop({ required: true })
  coordinates!: LineString[]
}

/**
 * GeoJSON/MultiPolygon.
 */
@EmbedModel(true, 0)
export class GeoMultiPolygon {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.MultiPolygon

  @Prop({ required: true })
  coordinates!: Polygon[]
}

/**
 * GeoJSON/GeometryCollection.
 */
@EmbedModel(true, 0)
export class GeometryCollection {
  @Prop({ enum: GeometryType, type: String })
  type!: GeometryType.GeometryCollection

  @Prop({ required: true })
  geometries!: Geometry[]
}

// #endregion
