import { Prop, Ref } from '@typegoose/typegoose'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Bsc } from '../bsc'
import { Cell } from '../cell'
import { EntityModel } from '../options'
import { Cell2GBand } from './enum'

/**
 * 2G cell.
 */
@ObjectType()
@EntityModel('cells2g')
export class Cell2G extends Cell {
  @Field(() => Bsc)
  @Prop({ ref: 'Bsc', required: true })
  bsc!: Ref<Bsc>

  @Field(() => Int)
  @Prop({ default: 0 })
  mcc!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  mnc!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  ncc!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  bcc!: number

  @Field(() => Cell2GBand)
  @Prop({ required: true })
  band!: Cell2GBand

  @Field(() => Int)
  @Prop({ default: 0 })
  bcch!: number

  @Field(() => Int)
  @Prop({ default: 0 })
  trxNumber!: number

  @Field(() => Float)
  @Prop({ default: 0 })
  trxPower!: number
}
