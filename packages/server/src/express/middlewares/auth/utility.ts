import { Request } from 'express'
import { verify } from 'jsonwebtoken'
import { get, isEmpty } from 'lodash'
import { Logger } from '~/logger'
import { AuthTokenConfig, AuthTokenPayload, CurrentUser } from '~/modules'
import { Token } from './types'

const logger = Logger.create({
  src: 'express/auth'
})

/**
 * Returns the token value if parses successfully.
 * Format: "Bearer <value>".
 * @param [token] Token.
 * @returns Token value if valid.
 */
export const parse = (token = '') => {
  const parts = token.split(' ')

  if (parts.length !== 2) return undefined
  if (parts[0] !== 'Bearer') return undefined
  if (isEmpty(parts[1])) return undefined

  return parts[1]
}

/**
 * Verifies token.
 * @param token Token.
 * @param secret Secret to verify token.
 * @returns Current user if the token is valid.
 */
export const getCurrentUser = (token: string, secret: string) => {
  try {
    const payload = verify(token, secret) as AuthTokenPayload
    return new CurrentUser(payload)
  } catch (error) {
    return undefined
  }
}

/**
 * Validates a token.
 * @param req Server request.
 * @param config Configuration.
 * @returns Token.
 */
export const validate = (req: Request, config: AuthTokenConfig): Token => {
  const { accessToken, refreshToken } = config

  const tokenValue =
    get(req.headers, 'authorization') ||
    get(req.cookies, accessToken.name) ||
    get(req.cookies, refreshToken.name)
  const token = parse(tokenValue)
  logger.debug('validate', {
    authorization: get(req.headers, 'authorization'),
    'access-token': get(req.cookies, accessToken.name),
    'refresh-token': get(req.cookies, refreshToken.name),
    tokenValue,
    token
  })

  if (token) {
    let user = getCurrentUser(token, accessToken.secret)
    if (user) {
      user.setTokens(config)
      return { user }
    }

    user = getCurrentUser(token, refreshToken.secret)
    if (user) {
      user.setTokens(config)
      return { user, refresh: true }
    }

    return { expired: true }
  }

  return {}
}
