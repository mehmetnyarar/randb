import { AuthChecker } from 'type-graphql'
import { Logger } from '~/logger'
import { UserRole } from '~/models'
import { CurrentUser } from '~/modules'
import { GraphQLContext } from './types'

const logger = Logger.create({
  src: 'graphql/auth'
})

/**
 * Determines the user roles to be ignored
 * while performing authorization check.
 * @param config Auth checker configuration.
 * @returns User roles.
 */
export const getIgnoredRoles = (config: true | string[]) => {
  if (Array.isArray(config)) {
    return Object.values(UserRole).reduce((roles, role) => {
      return config.includes(role) ? roles : roles.concat(role as UserRole)
    }, [] as UserRole[])
  }

  return config
    ? [] // Do not ignore any roles
    : Object.values(UserRole) // Ignore all the roles
}

/**
 * Determines whether the user is authorized or not.
 * @param user Current user.
 * @param roles Roles.
 * @returns True if he conditions are met.
 */
export const isUserAuthorized = (
  user?: CurrentUser,
  roles: UserRole[] = []
) => {
  return user ? roles.some(role => user.roles.includes(role)) : false
}

/**
 * Determines whether the current user is authorized
 * to perform the current GraphQL operation or not.
 * @param data Resolver data.
 * @param roles User roles.
 * @returns True if the operation is allowed to be performed.
 */
export const authChecker: AuthChecker<GraphQLContext, UserRole> = async (
  { context: { auth, currentUser } },
  roles
) => {
  let result = true
  if (auth && roles && roles.length) {
    const ignore = getIgnoredRoles(auth)
    const ignoreUser = roles.some(role => ignore.includes(role))
    logger.debug('', { ignore, ignoreUser })

    if (!ignoreUser) {
      result = isUserAuthorized(currentUser, roles)
    }
  }

  logger.debug('', { auth, roles, currentUser, result })
  return result
}
