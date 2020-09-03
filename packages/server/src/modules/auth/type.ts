import { Field, ID, ObjectType } from 'type-graphql'
import { User, UserRole } from '~/models'
import { EntityOrDocument } from '~/types'

/**
 * Current user.
 */
@ObjectType()
export class CurrentUser {
  // #region Properties

  @Field(() => ID)
  id: string

  @Field(() => [UserRole])
  roles: UserRole[]

  // #endregion

  // #region Constructor

  constructor (user: EntityOrDocument<User>) {
    this.id = user.id
    this.roles = user.roles
  }

  // #endregion
}
