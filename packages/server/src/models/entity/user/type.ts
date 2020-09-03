import { Index, Prop, Ref } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import {
  GeoLocation,
  GeoPoint,
  PersonGender,
  PersonName,
  PhoneNumber
} from '~/models/embed'
import { Entity } from '../base'
import { EntityModel } from '../options'
import { UserRole } from './enum'

/**
 * User.
 */
@ObjectType()
@EntityModel('users')
@Index({ location: '2dsphere' })
export class User extends Entity {
  // #region Profile

  @Field(() => PersonName)
  @Prop({ required: true })
  name!: PersonName

  @Field()
  @Prop({ default: '' })
  email!: string

  @Field(() => PhoneNumber)
  @Prop({ required: true })
  phone!: PhoneNumber

  @Field(() => PersonGender)
  @Prop({ enum: PersonGender, type: String, required: true })
  gender!: PersonGender

  @Field({ nullable: true })
  @Prop()
  birthday?: Date

  // #endregion

  // #region Location

  @Field(() => GeoLocation, { nullable: true })
  @Prop()
  location?: GeoPoint

  @Field(() => [GeoLocation])
  @Prop({ type: GeoLocation, default: [] })
  locations!: GeoLocation[]

  // #endregion

  // #region Auth

  /**
   * Number of authentication operations.
   */
  @Prop({ default: 0 })
  auth!: number

  @Field(() => [UserRole])
  @Prop({ enum: UserRole, type: String, default: [] })
  roles!: UserRole[]

  // #endregion

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
