import { Field, InputType } from 'type-graphql'
import { RequestOrigin } from './enum'

/**
 * Data for analytics purposes.
 */
@InputType()
export class AnalyticsInput {
  /**
   * User agent/device.
   */
  @Field({ nullable: true })
  agent?: string

  /**
   * Origin of the request.
   */
  @Field(() => RequestOrigin, { nullable: true })
  origin?: RequestOrigin
}
