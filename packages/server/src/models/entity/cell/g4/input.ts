import { Field, InputType, Int } from 'type-graphql'
import { FloatRangeFilter } from '~/models/embed'
import { Cell4GBand } from './enum'

/**
 * Filter for 4G cells.
 */
@InputType()
export class Cells4GFilter {
  @Field(() => [Int], { nullable: true })
  pcis?: number[]

  @Field(() => [Cell4GBand], { nullable: true })
  bands?: Cell4GBand[]

  @Field(() => [Int], { nullable: true })
  dlEarfcns?: number[]

  @Field(() => [Int], { nullable: true })
  dlBandwiths?: number[]

  @Field(() => FloatRangeFilter, { nullable: true })
  maxPower?: number

  @Field(() => FloatRangeFilter, { nullable: true })
  rsPower?: number
}
