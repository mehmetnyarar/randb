import { Field, InputType } from 'type-graphql'
import {
  DateRangeFilter,
  PersonGender,
  PersonNameFilter,
  PersonNameInput,
  PhoneNumberFilter,
  PhoneNumberInput
} from '~/models/embed'
import {
  DeleteEntityInput,
  EntitiesFilter,
  EntityFilter,
  EntityInput
} from '../base'
import { UserRole } from './enum'

/**
 * Filter for finding users.
 */
@InputType()
export class UsersFilter extends EntitiesFilter {
  @Field({ nullable: true })
  username?: string

  @Field(() => PersonNameFilter, { nullable: true })
  name?: PersonNameFilter

  @Field({ nullable: true })
  email?: string

  @Field(() => PhoneNumberFilter, { nullable: true })
  phone?: PhoneNumberFilter

  @Field(() => [PersonGender], { nullable: true })
  gender?: PersonGender[]

  @Field(() => DateRangeFilter, { nullable: true })
  birthday?: DateRangeFilter

  @Field(() => [UserRole], { nullable: true })
  roles?: UserRole[]
}

/**
 * Filter for finding a specific user.
 */
@InputType()
export class UserFilter extends EntityFilter {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: PhoneNumberFilter
}

/**
 * User profile input.
 */
@InputType()
export class UserProfileInput extends EntityInput {
  @Field(() => PersonNameInput)
  name!: PersonNameInput

  @Field()
  email!: string

  @Field(() => PhoneNumberInput)
  phone!: PhoneNumberInput

  @Field(() => PersonGender)
  gender!: PersonGender

  @Field({ nullable: true })
  birthday?: Date
}

/**
 * Input for creating a new user or updating existing one.
 */
@InputType()
export class UpsertUserInput extends UserProfileInput {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  password?: string

  @Field(() => [UserRole])
  roles!: UserRole[]
}

/**
 * Input to delete a user.
 */
@InputType()
export class DeleteUserInput extends DeleteEntityInput {}
