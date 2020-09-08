import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Antenna } from '../antenna'
import { Entity } from '../base'
import { Lac } from '../lac'
import { Site } from '../site'
import { User } from '../user'
import { Scenario } from './enum'

/**
 * Cell.
 */
@ObjectType()
export class Cell extends Entity {
  @Field(() => Lac, { nullable: true })
  @Prop({ ref: 'Lac' })
  lac?: Ref<Lac>

  @Field(() => Site)
  @Prop({ ref: 'Site', required: true })
  site!: Ref<Site>

  @Field()
  @Prop({ default: '' })
  sector!: string

  @Field()
  @Prop({ required: true, unique: true })
  ID!: string

  @Field()
  @Prop({ required: true, unique: true })
  name!: string

  @Field(() => Float)
  @Prop({ default: 0 })
  height!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  azimuth!: number

  @Field(() => Antenna)
  @Prop({ ref: 'Antenna' })
  antenna?: Ref<Antenna>

  @Field(() => Float)
  @Prop({ default: 0 })
  electricalTilt!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  mechanicalTilt!: number

  @Field(() => Scenario)
  @Prop({ enum: Scenario, type: String })
  scenario!: Scenario

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
