import { UserRole } from '~/models'

/**
 * User groups.
 */
export type UserGroup = 'sa' | 'admin' | 'manager' | 'user' | 'any'

/**
 * Role-based user groups.
 */
export type UserRoles = { [K in UserGroup]: UserRole[] }

/**
 * Role-based user groups.
 */
export const Authorize: UserRoles = {
  sa: [UserRole.SA],
  admin: [UserRole.SA, UserRole.ADMIN],
  manager: [UserRole.SA, UserRole.ADMIN, UserRole.MANAGER],
  user: [UserRole.USER],
  any: Object.values(UserRole)
}
