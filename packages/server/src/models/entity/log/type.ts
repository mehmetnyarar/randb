import { Prop, Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { RequestOrigin } from '~/models/embed'
import { Entity, EntityType } from '../base'
import { EntityModel } from '../options'
import { User } from '../user'
import { EventType } from './enum'

/**
 * Log.
 */
@ObjectType()
@EntityModel('logs')
export class Log extends Entity {
  // #region Log

  @Field(() => EventType)
  @Prop({ enum: EventType, type: String, required: true })
  event!: EventType

  @Field(() => EntityType, { nullable: true })
  @Prop({ enum: EntityType, type: String })
  entity?: EntityType

  @Field(() => ID, { nullable: true })
  @Prop()
  entityId?: Types.ObjectId

  @Field(() => [ID], { nullable: true })
  @Prop()
  entityIds?: Types.ObjectId[]

  @Field({ nullable: true })
  @Prop()
  message?: string

  @Field({ nullable: true })
  @Prop()
  data?: string

  // #endregion

  // #region Analytics

  @Field({ nullable: true })
  @Prop()
  ip?: string

  @Field({ nullable: true })
  @Prop()
  agent?: string

  @Field(() => RequestOrigin, { nullable: true })
  @Prop({ enum: RequestOrigin, type: String })
  origin?: RequestOrigin

  // #endregion

  // #region Entity

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>

  // #endregion
}
