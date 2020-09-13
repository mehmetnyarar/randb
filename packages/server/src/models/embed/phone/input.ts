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
