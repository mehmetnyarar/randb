import { Field, ID, InputType } from 'type-graphql'
import { NetworkElementFilter, NetworkElementsFilter } from '../ne'

/**
 * Filter for finding sites.
 */
@InputType()
export class SitesFilter extends NetworkElementsFilter {
  @Field(() => ID, { nullable: true })
  bscs?: string[]

  @Field(() => ID, { nullable: true })
  rncs?: string[]

  @Field(() => ID, { nullable: true })
  tacs?: string[]

  @Field(() => ID, { nullable: true })
  lacs?: string[]
}

/**
 * Filter for finding a specific site.
 */
@InputType()
export class SiteFilter extends NetworkElementFilter {}
