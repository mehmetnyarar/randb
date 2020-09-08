import { Prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { GeoPolygon } from '~/models/embed'
import { Entity } from '../base'
import { Site } from '../site'
import { User } from '../user'

/**
 * Base model for a topological parent.
 */
@ObjectType()
export class Parent extends Entity {
  @Field({ nullable: true })
  @Prop()
  ID?: string

  @Field()
  @Prop({ required: true, unique: true })
  name!: string

  // REVIEW Hidden from the API at the moment
  // Exposed type might be an array of LinearRings
  @Prop()
  location?: GeoPolygon

  @Field(() => ID)
  @Prop({ ref: 'Site', default: [] })
  sites!: Ref<Site>[]

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
