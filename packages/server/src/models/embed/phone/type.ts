import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { EmbedModel } from '../options'

/**
 * Phone number.
 * @see https://en.wikipedia.org/wiki/E.123#/media/File:Phone_number_setup.png
 */
@ObjectType()
@EmbedModel()
export class PhoneNumber {
  /**
   * Country Calling Code.
   */
  @Field()
  @Prop({ default: '' })
  cc!: string

  /**
   * National Destination Code.
   */
  @Field()
  @Prop({ default: '' })
  dc!: string

  /**
   * Subscriber Number.
   */
  @Field()
  @Prop({ default: '' })
  sn!: string
}
