import { Field, InputType } from 'type-graphql'
import { AnalyticsInput, PhoneNumberInput } from '~/models'

/**
 * Input to sign-in user.
 */
@InputType()
export class SigninUserInput extends AnalyticsInput {
  @Field({ nullable: true })
  email?: string

  @Field(() => PhoneNumberInput, { nullable: true })
  phone?: PhoneNumberInput

  @Field()
  password!: string
}

/**
 * Input to sign-out a user.
 */
@InputType()
export class SignoutUserInput extends AnalyticsInput {}
