import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, ObjectType } from 'type-graphql'
import { Entity } from '../base'
import { EntityModel } from '../options'
import { User } from '../user'

/**
 * Antenna.
 */
@ObjectType()
@EntityModel('antennas')
export class Antenna extends Entity {
  @Field()
  @Prop({ required: true, unique: true })
  name!: string

  @Field(() => Float)
  @Prop({ default: 65 })
  beamwidth!: number

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
