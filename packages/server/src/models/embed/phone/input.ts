import { Field, InputType } from 'type-graphql'

/**
 * Phone number input.
 */
@InputType()
export class PhoneNumberInput {
  /**
   * Country Calling Code.
   */
  @Field()
  cc!: string

  /**
   * National Destination Code.
   */
  @Field()
  dc!: string

  /**
   * Subscriber Number.
   */
  @Field()
  sn!: string
}

/**
 * Phone number filter.
 */
@InputType()
export class PhoneNumberFilter {
  /**
   * Country Calling Code.
   */
  @Field({ nullable: true })
  cc?: string

  /**
   * National Destination Code.
   */
  @Field({ nullable: true })
  dc?: string

  /**
   * Subscriber Number.
   */
  @Field({ nullable: true })
  sn?: string
}
