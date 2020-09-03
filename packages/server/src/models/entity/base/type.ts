import { Prop, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Field, ID, ObjectType } from 'type-graphql'

/**
 * Base entity.
 */
@ObjectType()
export class Entity extends Base {
  @Field(() => ID)
  get id () {
    return this._id.toHexString()
  }

  @Field({ nullable: true })
  @Prop()
  createdAt?: Date

  // @Field must implemented individually per entity
  @Prop({ ref: 'User' })
  createdBy?: Ref<Entity>

  @Field({ nullable: true })
  @Prop()
  updatedAt?: Date

  // @Field must implemented individually per entity
  @Prop({ ref: 'User' })
  updatedBy?: Ref<Entity>

  @Field(() => [ID], { nullable: true })
  @Prop({ ref: 'Log' })
  logs?: Ref<Entity>[]

  @Field({ nullable: true })
  @Prop()
  isMock?: boolean

  @Field()
  @Prop({ default: true })
  isActive!: boolean

  @Field({ nullable: true })
  @Prop()
  deactivatedAt?: Date
}
