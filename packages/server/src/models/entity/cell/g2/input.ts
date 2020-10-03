import { Field, InputType, Int } from 'type-graphql'
import { FloatRangeFilter } from '~/models/embed'
import { Cell2GBand } from './enum'

/**
 * Filter for 2G cells.
 */
@InputType()
export class Cells2GFilter {
  @Field(() => Int, { nullable: true })
  mcc?: number

  @Field(() => Int, { nullable: true })
  mnc?: number

  @Field(() => Int, { nullable: true })
  ncc?: number

  @Field(() => Int, { nullable: true })
  bcc?: number

  @Field(() => [Cell2GBand], { nullable: true })
  bands?: Cell2GBand[]

  @Field(() => [Int], { nullable: true })
  bcchs?: number[]

  @Field(() => FloatRangeFilter, { nullable: true })
  trxNumber?: number

  @Field(() => FloatRangeFilter, { nullable: true })
  trxPower?: number
}
