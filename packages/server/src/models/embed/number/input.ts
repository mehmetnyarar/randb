import { Field, Float, InputType, Int } from 'type-graphql'

/**
 * Float range filter.
 */
@InputType()
export class FloatRangeFilter {
  @Field(() => Float, { nullable: true })
  min?: number

  @Field(() => Float, { nullable: true })
  max?: number
}

/**
 * Int range filter.
 */
@InputType()
export class IntRangeFilter {
  @Field(() => Int, { nullable: true })
  min?: number

  @Field(() => Int, { nullable: true })
  max?: number
}

/**
 * Number range filter.
 */
export type NumberRangeFilter = FloatRangeFilter | IntRangeFilter
