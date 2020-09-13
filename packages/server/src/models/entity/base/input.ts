import { Field, ID } from 'type-graphql'
import { AnalyticsInput } from '~/models/embed'

/**
 * Entity input.
 */
export class EntityInput extends AnalyticsInput {
  @Field(() => ID, { nullable: true })
  id?: string
}
