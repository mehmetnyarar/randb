import { Field, InputType, Int } from 'type-graphql'
import { FloatRangeFilter } from '~/models/embed'
import { Cell3GBand } from './enum'

/**
 * Filter for 3G cells.
 */
@InputType()
export class Cells3GFilter {
  @Field(() => [Int], { nullable: true })
  pscs?: number[]

  @Field(() => [Cell3GBand], { nullable: true })
  bands?: Cell3GBand[]

  @Field(() => [Int], { nullable: true })
  arfcns?: number[]

  @Field(() => FloatRangeFilter, { nullable: true })
  totalPower?: number

  @Field(() => FloatRangeFilter, { nullable: true })
  pilotPower?: number
}
