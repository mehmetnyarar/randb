import { Prop } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { EmbedModel } from '~/models/embed'
import { Cell4GBand } from './enum'

/**
 * 4G Cell.
 */
@ObjectType()
@EmbedModel()
export class Cell4G {
  @Field(() => Int)
  @Prop({ default: 0 })
  pci!: number

  @Field(() => Cell4GBand)
  @Prop({ required: true })
  band!: Cell4GBand

  @Field(() => Int)
  @Prop({ default: 0 })
  dlEarfcn!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  dlBandwith!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  channelIndex!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  maxPower!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  rsPower!: number
}
