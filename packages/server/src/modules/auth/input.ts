import { Field, InputType } from 'type-graphql'
import { AnalyticsInput, PhoneNumberInput } from '~/models'

/**
 * Input to sign-in user.
 */
@InputType()
export class SigninUserInput extends AnalyticsInput {
  @Field()
  email!: string

  @Field(() => PhoneNumberInput)
  phone!: PhoneNumberInput

  @Field()
  password!: string
}

/**
 * Input to sign-out a user.
 */
@InputType()
export class SignoutUserInput extends AnalyticsInput {}
