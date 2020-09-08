import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Cell } from '../cell/type'
import { EntityModel } from '../options'
import { Tac } from '../tac'
import { Cell4GBand } from './enum'

/**
 * 4G Cell.
 */
@ObjectType()
@EntityModel('cells4g')
export class Cell4G extends Cell {
  @Field(() => Tac)
  @Prop({ ref: 'Tac', required: true })
  tac!: Ref<Tac>

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
