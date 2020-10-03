import { Prop, Ref } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { Geometry } from '~/models/embed'
import { Entity } from '../base'
import { User } from '../user'
import { ElementType, NetworkType } from './enum'

/**
 * Base model for a network element.
 */
@ObjectType()
export class NetworkElement extends Entity {
  @Field(() => ElementType)
  @Prop({ enum: ElementType, type: String, required: true })
  type!: ElementType

  @Field()
  @Prop({ default: '' })
  ID!: string

  @Field()
  @Prop({ required: true, unique: true })
  name!: string

  @Field(() => NetworkType, { nullable: true })
  @Prop({ enum: NetworkType, type: String })
  network?: NetworkType

  // Geometry differs based on the type of network element
  // @Field must implemented individually per entity
  @Prop()
  location?: Geometry

  // Type of children differs based on the type of network element
  // @Field must implemented individually per entity
  @Prop()
  children?: Ref<NetworkElement>[]

  @Field(() => User, { nullable: true })
  createdBy?: Ref<User>

  @Field(() => User, { nullable: true })
  updatedBy?: Ref<User>
}
