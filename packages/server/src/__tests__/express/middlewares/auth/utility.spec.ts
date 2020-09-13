import { Request } from 'express'
import { pick } from 'lodash'
import { Types } from 'mongoose'
import {
  getCurrentUser,
  parse,
  validate
} from '~/express/middlewares/auth/utility'
import {
  AuthTokenConfig,
  createAuthToken,
  CurrentUser,
  getTokenConfig
} from '~/modules'
import { getBearerToken } from '~/modules/auth/utility/cookies'

// #region Setup

const config: AuthTokenConfig = {
  accessToken: getTokenConfig('access-token,ACCESS-SECRET,1h'),
  refreshToken: getTokenConfig('refresh-token,REFRESH-SECRET,6h')
}

const id = Types.ObjectId().toHexString()
const user = new CurrentUser({ id, roles: [] })
const accessToken = createAuthToken(user, config.accessToken)
const refreshToken = createAuthToken(user, config.refreshToken)

// #endregion

describe('express/auth', () => {
  describe('parse', () => {
    it('should return token value', () => {
      expect(parse('')).toBeUndefined()
      expect(parse('token')).toBeUndefined()
      expect(parse('Random token')).toBeUndefined()
      expect(parse('Bearer token')).toBe('token')
    })
  })

  describe('getCurrentUser', () => {
    it('should return undefined (invalid token)', () => {
      const currentUser = getCurrentUser('', config.accessToken.secret)
      expect(currentUser).toBeUndefined()
    })

    it('should return the current user', () => {
      const currentUser = getCurrentUser(
        accessToken.value,
        config.accessToken.secret
      )
      expect(currentUser).toMatchObject({ id, roles: [] })
    })
  })

  describe('validate', () => {
    it('should return token', () => {
      expect(validate({} as Request, config)).toEqual({})

      let result = validate(
        {
          headers: { authorization: getBearerToken(accessToken.value) }
        } as Request,
        config
      )
      expect(result.user).toMatchObject(pick(user, ['id', 'roles']))
      expect(result.refresh).toBeFalsy()
      expect(result.expired).toBeFalsy()

      result = validate(
        {
          cookies: { 'access-token': getBearerToken(accessToken.value) }
        } as Request,
        config
      )
      expect(result.user).toMatchObject(pick(user, ['id', 'roles']))
      expect(result.refresh).toBeFalsy()
      expect(result.expired).toBeFalsy()

      result = validate(
        {
          cookies: { 'refresh-token': getBearerToken(refreshToken.value) }
        } as Request,
        config
      )
      expect(result.user).toMatchObject(pick(user, ['id', 'roles']))
      expect(result.refresh).toBeTruthy()
      expect(result.expired).toBeFalsy()

      test.todo('Create a test for expired condition')
    })
  })
})
