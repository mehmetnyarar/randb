import { Index, Prop, Ref } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { NetworkElement } from '../ne'
import { EntityModel } from '../options'
import { Site } from '../site'

/**
 * BSC.
 */
@ObjectType()
@EntityModel('bscs', 0)
@Index({ location: '2dsphere' })
export class Bsc extends NetworkElement {
  @Field(() => [Site])
  @Prop({ ref: 'Site', default: [] })
  children!: Ref<Site>[]
}
