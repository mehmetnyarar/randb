import { Prop } from '@typegoose/typegoose'
import { Field, Int, ObjectType } from 'type-graphql'
import { EmbedModel } from '../options'

/**
 * File.
 */
@ObjectType()
@EmbedModel()
export class File {
  @Field()
  @Prop({ default: '' })
  name!: string

  @Field()
  @Prop({ default: '' })
  path!: string

  @Field(() => Int)
  @Prop({ default: 0 })
  size!: number

  @Field()
  @Prop({ default: '' })
  type!: string
}
