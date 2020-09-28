import { Request } from 'express'
import { Types } from 'mongoose'
import {
  getCurrentUser,
  parse,
  validate
} from '~/express/middlewares/auth/utility'
import { CurrentUser } from '~/modules/auth/type'
import { AuthTokenConfig } from '~/modules/auth/types'
import {
  createAuthToken,
  getBearerToken,
  getTokenConfig
} from '~/modules/auth/utility'

// #region Setup

const config: AuthTokenConfig = {
  accessToken: getTokenConfig('access-token,ACCESS-SECRET,1h'),
  refreshToken: getTokenConfig('refresh-token,REFRESH-SECRET,6h')
}

const id = Types.ObjectId().toHexString()
const user = new CurrentUser({
  id,
  name: { first: 'Test', last: 'User' },
  roles: []
})
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
      expect(currentUser).toMatchObject(user)
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
      expect(result.user).toMatchObject(user)
      expect(result.refresh).toBeFalsy()
      expect(result.expired).toBeFalsy()

      result = validate(
        {
          cookies: { 'access-token': getBearerToken(accessToken.value) }
        } as Request,
        config
      )
      expect(result.user).toMatchObject(user)
      expect(result.refresh).toBeFalsy()
      expect(result.expired).toBeFalsy()

      result = validate(
        {
          cookies: { 'refresh-token': getBearerToken(refreshToken.value) }
        } as Request,
        config
      )
      expect(result.user).toMatchObject(user)
      expect(result.refresh).toBeTruthy()
      expect(result.expired).toBeFalsy()

      test.todo('Create a test for expired condition')
    })
  })
})
