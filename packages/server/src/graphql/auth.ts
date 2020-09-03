import { AuthChecker } from 'type-graphql'
import { UserRole } from '~/models'
import { GraphQLContext } from './types'

/**
 * Determines the user roles to be ignored
 * while performing authorization check.
 * @param config Auth checker configuration.
 * @returns User roles.
 */
export const getIgnoredRoles = (config: true | string[]) => {
  if (config === true) return [] // Do not ignore any

  // Ignore roles that are specified in env/GRAPHQL_AUTH
  return Object.values(UserRole).reduce((roles, role) => {
    return config.includes(role) ? roles : roles.concat(role as UserRole)
  }, [] as UserRole[])
}

/**
 * Determines whether the current user is authorized
 * to perform the current GraphQL operation or not.
 * @param data Resolver data.
 * @param roles User roles.
 * @returns True if the operation is allowed to be performed.
 */
export const authChecker: AuthChecker<GraphQLContext, UserRole> = async (
  { context },
  roles
) => {
  // Allow operation if the auth checker is disabled
  if (!context.auth) return true

  // Allow operation if the role is not to be authorized
  const ignored = getIgnoredRoles(context.auth)
  if (roles.some(role => ignored.includes(role))) {
    return true
  }

  const { currentUser } = context

  // Block operation if the user is not logged in
  if (!currentUser) return false

  // Allow operation if the roles are not defined/specified
  if (!roles || !roles.length) return true

  // Allow operation if the user's roles are permitted
  return roles.some(role => currentUser.roles.includes(role))
}
