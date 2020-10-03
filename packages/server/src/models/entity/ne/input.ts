import { Field, InputType } from 'type-graphql'
import { EntitiesFilter, EntityFilter } from '../base'
import { ElementType, NetworkType } from './enum'

/**
 * Filter for finding network elements.
 */
@InputType()
export class NetworkElementsFilter extends EntitiesFilter {
  @Field(() => ElementType, { nullable: true })
  type?: ElementType

  @Field(() => [ElementType], { nullable: true })
  types?: ElementType[]

  @Field({ nullable: true })
  name?: string

  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType

  @Field(() => [NetworkType], { nullable: true })
  networks?: NetworkType[]
}

/**
 * Filter for finding a specific network element.
 */
@InputType()
export class NetworkElementFilter extends EntityFilter {
  @Field({ nullable: true })
  name?: string

  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType
}
