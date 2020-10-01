import { UserRole } from '../../../graphql'

/**
 * Determines whether a user is authorized to perform an action or not.
 * @param auth Roles to be authorized.
 * @param user User roles.
 * @returns True if the conditions are met.
 */
export const isUserAuthorized = (auth?: UserRole[], user?: UserRole[]) => {
  if (!auth || !auth.length) return true
  if (!user || !user.length) return false
  return auth.some(role => user.includes(role))
}
