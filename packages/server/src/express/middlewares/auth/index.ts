import { RequestHandler } from 'express'
import { Logger } from '~/logger'
import { UserModel } from '~/models'
import { cookies, getAuthTokenConfig } from '~/modules'
import { validate } from './utility'

const logger = Logger.create({
  src: 'express/auth'
})

/**
 * Custom authentication middleware.
 */
export const middleware: RequestHandler = async (req, res, next) => {
  const config = getAuthTokenConfig()
  const { user, refresh, expired } = validate(req, config)

  if (expired) {
    logger.debug('token has expired')
    cookies.clear(res, config)
  } else if (user) {
    if (refresh) {
      logger.debug('valid refresh token')
      if (await UserModel.findById(user.id)) {
        logger.debug('user found')
        user.setTokens()
        cookies.send(res, user, config)
      } else {
        logger.debug('user not found')
        cookies.clear(res, config)
      }
    } else {
      logger.debug('valid access token')
      req.user = user
    }
  } else {
    logger.debug('no token')
  }

  next()
}
