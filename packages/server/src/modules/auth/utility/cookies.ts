import { CookieOptions, Response } from 'express'
import { ACCESS_TOKEN, REFRESH_TOKEN, SSL } from '~/config'
import { Logger } from '~/logger'
import { AuthToken, AuthTokenConfig } from '../types'
import { getBearerToken, getTokenConfig } from './token'

const logger = Logger.create({
  src: 'auth/cookies'
})

/**
 * Sends auth tokens in cookies.
 * @param res Server response.
 * @param token Auth tokens.
 * @param config Configuration.
 * @param options Cookie options.
 */
const send = (
  res: Response,
  token: AuthToken,
  config: Partial<AuthTokenConfig> = {},
  options: CookieOptions = {}
) => {
  const {
    accessToken = getTokenConfig(ACCESS_TOKEN),
    refreshToken = getTokenConfig(REFRESH_TOKEN)
  } = config

  // send access token
  if (token.accessToken) {
    const { name } = accessToken
    const { value, expires } = token.accessToken
    res.cookie(name, getBearerToken(value), {
      ...options,
      httpOnly: true,
      secure: SSL,
      expires
    })
    logger.success('send access token')
  }

  // send refresh token
  if (token.refreshToken) {
    const { name } = refreshToken
    const { value, expires } = token.refreshToken
    res.cookie(name, getBearerToken(value), {
      ...options,
      httpOnly: true,
      secure: SSL,
      expires
    })
    logger.success('send refresh token')
  }
}

/**
 * Clears auth tokens.
 * @param res Server response.
 * @param [config] Configuration.
 */
const clear = (res: Response, config: Partial<AuthTokenConfig> = {}) => {
  const {
    accessToken = getTokenConfig(ACCESS_TOKEN),
    refreshToken = getTokenConfig(REFRESH_TOKEN)
  } = config

  res.clearCookie(accessToken.name)
  res.clearCookie(refreshToken.name)
  logger.success('clear tokens')
}

export { send, clear }
