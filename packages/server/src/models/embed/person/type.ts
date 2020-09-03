import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { EmbedModel } from '../options'

/**
 * Person name.
 */
@ObjectType()
@EmbedModel()
export class PersonName {
  @Field()
  @Prop({ default: '' })
  first!: string

  @Field()
  @Prop({ default: '' })
  last!: string
}
