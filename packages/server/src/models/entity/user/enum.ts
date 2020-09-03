import { registerEnumType } from 'type-graphql'

/**
 * User role.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

registerEnumType(UserRole, { name: 'UserRole' })
