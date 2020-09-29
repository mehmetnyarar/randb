import { Field, ID, InputType } from 'type-graphql'
import { AnalyticsInput, DateRangeFilter } from '~/models/embed'

/**
 * Entity input.
 */
@InputType()
export class EntityInput extends AnalyticsInput {
  @Field(() => ID, { nullable: true })
  id?: string
}

/**
 * Filter for finding entities.
 */
@InputType()
export class EntitiesFilter extends AnalyticsInput {
  @Field(() => [ID], { nullable: true })
  ids?: string[]

  @Field(() => DateRangeFilter, { nullable: true })
  createdAt?: DateRangeFilter

  @Field(() => ID, { nullable: true })
  createdBy?: string

  @Field(() => DateRangeFilter, { nullable: true })
  updatedAt?: DateRangeFilter

  @Field(() => ID, { nullable: true })
  updatedBy?: string

  @Field({ nullable: true })
  isMock?: boolean

  @Field({ nullable: true })
  isActive?: boolean
}

/**
 * Filter for finding a specific entity.
 */
@InputType()
export class EntityFilter extends AnalyticsInput {
  @Field(() => ID, { nullable: true })
  id?: string
}
