import { Field, InputType } from 'type-graphql'

/**
 * Person name filter.
 */
@InputType()
export class PersonNameFilter {
  @Field({ nullable: true })
  first?: string

  @Field({ nullable: true })
  last?: string
}
