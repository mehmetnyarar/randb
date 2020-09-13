import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { EmbedModel } from '../options'

/**
 * User token.
 */
@ObjectType()
@EmbedModel()
export class UserToken {
  /**
   * Token name.
   */
  @Field()
  @Prop({ required: true })
  name!: string

  /**
   * Token value.
   */
  @Field()
  @Prop({ required: true })
  value!: string

  /**
   * Expiry date of the token.
   */
  @Field()
  @Prop({ required: true })
  expires!: Date
}
