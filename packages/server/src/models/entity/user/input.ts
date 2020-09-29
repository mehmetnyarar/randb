import { Field, InputType } from 'type-graphql'
import {
  DateRangeFilter,
  PersonGender,
  PersonNameFilter,
  PhoneNumberFilter
} from '~/models/embed'
import { EntitiesFilter, EntityFilter } from '../base'
import { UserRole } from './enum'

/**
 * Filter for finding users.
 */
@InputType()
export class UsersFilter extends EntitiesFilter {
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
  email?: string

  @Field({ nullable: true })
  phone?: PhoneNumberFilter
}
