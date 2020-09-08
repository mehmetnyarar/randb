import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Cell } from '../cell/type'
import { EntityModel } from '../options'
import { Rnc } from '../rnc'
import { Cell3GBand } from './enum'

/**
 * 3G cell.
 */
@ObjectType()
@EntityModel('cells3g')
export class Cell3G extends Cell {
  @Field(() => Rnc)
  @Prop({ ref: 'Rnc', required: true })
  rnc!: Ref<Rnc>

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
