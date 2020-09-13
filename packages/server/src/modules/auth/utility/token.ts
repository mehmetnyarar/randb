import { addMilliseconds } from 'date-fns'
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'
import ms from 'ms'
import { RESET_TOKEN } from '~/config'
import { UserToken } from '~/models'
import { AuthTokenPayload, CurrentUser } from '~/modules'
import { ResetTokenPayload, TokenConfig } from '../types'

/**
 * Creates a token configuration.
 * @param config Value of env variable.
 * @returns Token configuration.
 * @see env/*_TOKEN
 */
export const getTokenConfig = (config: string): TokenConfig => {
  const token = config.split(',')

  if (token.length !== 3) {
    throw new Error('Invalid token configuration!')
  }

  return {
    name: token[0],
    secret: token[1],
    expiry: ms(token[2])
  }
}

/**
 * Creates a reset token.
 * @param code Authentication code.
 * @param [config] Token configuration.
 * @param [startDate] Start date.
 * @returns User token.
 */
export const createResetToken = (
  code: string,
  config = RESET_TOKEN,
  startDate?: Date
): UserToken => {
  const { name, secret, expiry } = getTokenConfig(config)
  const expiryDate = addMilliseconds(startDate || new Date(), expiry)
  const payload: ResetTokenPayload = { code, expiry: expiryDate }

  return {
    name,
    value: sign(payload, secret, { expiresIn: expiry }),
    expires: expiryDate
  }
}

/**
 * Creates an access token.
 * @param user User.
 * @param [config] Token configuration.
 * @param [startDate] Start date.
 * @returns User token.
 */
export const createAuthToken = (
  user: CurrentUser,
  config = '',
  startDate?: Date
): UserToken => {
  const { name, secret, expiry } = getTokenConfig(config)
  const payload: AuthTokenPayload = pick(user, ['id', 'roles'])

  return {
    name,
    value: sign(payload, secret, { expiresIn: expiry }),
    expires: addMilliseconds(startDate || new Date(), expiry)
  }
}
