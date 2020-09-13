import { omit, pick } from 'lodash'
import { Types } from 'mongoose'
import {
  DEFAULT_PHONE_NUMBER,
  EntityType,
  EventType,
  getDoc,
  getLog,
  Log,
  RequestOrigin
} from '~/models'
import { CurrentUser, SigninUserInput } from '~/modules'

// #region Setup

const input: SigninUserInput = {
  email: 'test.user@myapp.com',
  phone: DEFAULT_PHONE_NUMBER,
  password: '123456'
}

const analytics: SigninUserInput = {
  ...input,
  agent: 'Safari',
  origin: RequestOrigin.WEB
}

const entityId = Types.ObjectId()
const log: Partial<Log> = {
  event: EventType.AUTH_SIGNIN,
  entity: EntityType.USER,
  entityId
}

const userId = Types.ObjectId()
const user = new CurrentUser({ id: userId.toHexString(), roles: [] })

// #endregion

describe('models/utility', () => {
  describe('getDoc', () => {
    it('should return doc (default)', () => {
      expect(getDoc(input)).toEqual(pick(input, ['email', 'phone', 'password']))
    })

    it('should return doc (exclude)', () => {
      expect(getDoc(input, ['password'])).toEqual(
        pick(input, ['email', 'phone'])
      )
    })

    it('should return doc (partial)', () => {
      expect(getDoc(input, ['password'], { isActive: false })).toEqual({
        ...pick(input, ['email', 'phone']),
        isActive: false
      })
    })
  })

  describe('getLog', () => {
    it('should return log (default)', () => {
      expect(getLog(input)).toEqual({
        data: JSON.stringify(input),
        createdBy: undefined
      })
    })

    it('should return log (analytics)', () => {
      expect(getLog(analytics)).toEqual({
        ...pick(analytics, ['agent', 'origin']),
        data: JSON.stringify(analytics),
        createdBy: undefined
      })
    })

    it('should return log (partial)', () => {
      expect(getLog(analytics, log)).toEqual({
        ...log,
        ...pick(analytics, ['agent', 'origin']),
        data: JSON.stringify(analytics),
        createdBy: undefined
      })
    })

    it('should return log (current user)', () => {
      expect(getLog(analytics, log, user)).toEqual({
        ...log,
        ...pick(analytics, ['agent', 'origin']),
        data: JSON.stringify(analytics),
        createdBy: userId
      })
    })

    it('should return log (exclude)', () => {
      expect(getLog(analytics, log, user, ['password'])).toEqual({
        ...log,
        ...pick(analytics, ['agent', 'origin']),
        data: JSON.stringify(omit(analytics, ['password'])),
        createdBy: userId
      })
    })
  })
})
