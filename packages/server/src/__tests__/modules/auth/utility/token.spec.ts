import { addMilliseconds } from 'date-fns'
import { verify } from 'jsonwebtoken'
import ms from 'ms'
import { ACCESS_TOKEN, RESET_TOKEN } from '~/config'
import { UserRole } from '~/models'
import { AuthTokenPayload, CurrentUser } from '~/modules'
import {
  createAuthToken,
  createResetToken,
  getTokenConfig
} from '~/modules/auth/utility/token'

describe('modules/auth/utility/token', () => {
  describe('getTokenConfig', () => {
    it('should throw an error (invalid config)', () => {
      expect(() => {
        getTokenConfig('')
      }).toThrow()
    })

    it('should return config', () => {
      expect(getTokenConfig('token,secret,1d')).toEqual({
        name: 'token',
        secret: 'secret',
        expiry: ms('1d')
      })
    })
  })

  describe('createResetToken', () => {
    let config = RESET_TOKEN
    const code = '123456'
    const date = new Date()

    it('should create a token (default)', () => {
      const { secret, expiry } = getTokenConfig(RESET_TOKEN)
      const expires = addMilliseconds(date, expiry)
      const token = createResetToken(code, config, date)
      const result = verify(token.value, secret)
      expect(result).toMatchObject({ code, expiry: expires.toISOString() })
    })

    it('should create a token (custom)', () => {
      config = 'custom-token,SECRET,1h'
      const { secret, expiry } = getTokenConfig(config)
      const expires = addMilliseconds(date, expiry)
      const token = createResetToken(code, config, date)
      const result = verify(token.value, secret)
      expect(result).toMatchObject({ code, expiry: expires.toISOString() })
    })

    it('should throw an error (invalid config)', () => {
      expect(() => {
        createResetToken('code', '')
      }).toThrow()
    })
  })

  describe('createAuthToken', () => {
    let config = ACCESS_TOKEN
    const payload: AuthTokenPayload = { id: 'user-id', roles: [UserRole.USER] }
    const user = new CurrentUser(payload)
    const date = new Date()

    it('should create a token (default)', () => {
      const { secret } = getTokenConfig(config)
      const token = createAuthToken(user, config, date)
      const result = verify(token.value, secret)
      expect(result).toMatchObject(payload)
    })

    it('should create a token (custom)', () => {
      config = 'custom-token,SECRET,1h'
      const { secret } = getTokenConfig(config)
      const token = createAuthToken(user, config, date)
      const result = verify(token.value, secret)
      expect(result).toMatchObject(payload)
    })

    it('should throw an error (invalid config)', () => {
      expect(() => {
        createAuthToken(user, '')
      }).toThrow()
    })
  })
})
