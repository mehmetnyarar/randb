import { Field, ID, InputType } from 'type-graphql'
import { FloatRangeFilter } from '~/models/embed'
import { NetworkElementFilter, NetworkElementsFilter } from '../ne'
import { Scenario } from './enum'
import { Cells2GFilter } from './g2'
import { Cells3GFilter } from './g3'
import { Cells4GFilter } from './g4'

/**
 * Filter for finding cells.
 */
@InputType()
export class CellsFilter extends NetworkElementsFilter {
  @Field(() => [ID], { nullable: true })
  bscs?: string[]

  @Field(() => [ID], { nullable: true })
  rncs?: string[]

  @Field(() => [ID], { nullable: true })
  tacs?: string[]

  @Field(() => [ID], { nullable: true })
  lacs?: string[]

  @Field(() => ID, { nullable: true })
  site?: string

  @Field(() => [String], { nullable: true })
  sectors?: string[]

  @Field(() => FloatRangeFilter, { nullable: true })
  height?: number

  @Field(() => [ID], { nullable: true })
  antennas?: string[]

  @Field(() => FloatRangeFilter, { nullable: true })
  electricalTilt?: number

  @Field(() => FloatRangeFilter, { nullable: true })
  mechanicalTilt?: number

  @Field(() => [Scenario], { nullable: true })
  scenarios?: Scenario[]

  @Field(() => Cells2GFilter, { nullable: true })
  g2?: Cells2GFilter

  @Field(() => Cells3GFilter, { nullable: true })
  g3?: Cells3GFilter

  @Field(() => Cells4GFilter, { nullable: true })
  g4?: Cells4GFilter
}

/**
 * Filter for finding a specific cell.
 */
@InputType()
export class CellFilter extends NetworkElementFilter {}
