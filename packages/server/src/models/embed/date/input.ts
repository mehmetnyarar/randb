import { Field, InputType } from 'type-graphql'

/**
 * Date range filter.
 */
@InputType()
export class DateRangeFilter {
  @Field({ nullable: true })
  min?: Date

  @Field({ nullable: true })
  max?: Date
}
