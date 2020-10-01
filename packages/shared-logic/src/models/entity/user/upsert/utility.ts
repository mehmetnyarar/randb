import { merge, pick } from 'lodash'
import { cleanup, UpsertUserInput, User } from '../../../../graphql'
import { DEFAULT_UPSERT_USER_VALUES } from './const'

/**
 * Creates form values.
 * @param [initial={}] Initial values.
 * @param [user] User.
 * @return Input values.
 */
export const getValues = (
  initial: Partial<UpsertUserInput> = {},
  user?: User | UpsertUserInput
) => {
  const values = merge(
    {},
    DEFAULT_UPSERT_USER_VALUES,
    initial,
    user
      ? pick(user, [
        'id',
        'username',
        'name',
        'email',
        'phone',
        'gender',
        'birthday',
        'roles',
        'password'
      ])
      : {}
  ) as UpsertUserInput

  return cleanup(values)
}
