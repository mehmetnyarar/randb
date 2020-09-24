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

const CUSTOM_TOKEN = 'custom-token,SECRET,1h'

describe('modules/auth/utility/token', () => {
  describe('getTokenConfig', () => {
    it('should throw an error (invalid config)', () => {
      expect(() => {
        getTokenConfig('')
      }).toThrow()
    })

    it('should return config', () => {
      expect(getTokenConfig(CUSTOM_TOKEN)).toEqual({
        name: 'custom-token',
        secret: 'SECRET',
        expiry: ms('1h')
      })
    })
  })

  describe('createResetToken', () => {
    const code = '123456'
    const date = new Date()

    it('should create a token (default)', () => {
      const config = getTokenConfig(RESET_TOKEN)
      const expires = addMilliseconds(date, config.expiry)
      const token = createResetToken(code, config, date)
      const result = verify(token.value, config.secret)
      expect(result).toMatchObject({ code, expiry: expires.toISOString() })
    })

    it('should create a token (custom)', () => {
      const config = getTokenConfig(CUSTOM_TOKEN)
      const expires = addMilliseconds(date, config.expiry)
      const token = createResetToken(code, config, date)
      const result = verify(token.value, config.secret)
      expect(result).toMatchObject({ code, expiry: expires.toISOString() })
    })
  })

  describe('createAuthToken', () => {
    const payload: AuthTokenPayload = {
      id: 'user-id',
      name: { first: 'Test', last: 'User' },
      roles: [UserRole.USER]
    }
    const user = new CurrentUser(payload)
    const date = new Date()

    it('should create a token (default)', () => {
      const config = getTokenConfig(ACCESS_TOKEN)
      const token = createAuthToken(user, config, date)
      const result = verify(token.value, config.secret)
      expect(result).toMatchObject(payload)
    })

    it('should create a token (custom)', () => {
      const config = getTokenConfig(CUSTOM_TOKEN)
      const token = createAuthToken(user, config, date)
      const result = verify(token.value, config.secret)
      expect(result).toMatchObject(payload)
    })
  })
})
