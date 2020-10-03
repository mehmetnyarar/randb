import { Prop } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { EmbedModel } from '~/models/embed'
import { Cell3GBand } from './enum'

/**
 * 3G cell.
 */
@ObjectType()
@EmbedModel()
export class Cell3G {
  @Field(() => Int)
  @Prop({ default: 0 })
  psc!: number

  @Field(() => Cell3GBand)
  @Prop({ required: true })
  band!: Cell3GBand

  @Field(() => Int)
  @Prop({ default: 0 })
  arfcn!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  totalPower!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  pilotPower!: number
}
