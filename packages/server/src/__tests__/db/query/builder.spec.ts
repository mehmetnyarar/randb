import { pick } from 'lodash'
import { BetweenOptions, QueryBuilder, SANITIZE } from '~/db/query'
import {
  DateRangeFilter,
  PhoneNumberFilter,
  UserModel,
  UserRole
} from '~/models'

// #region Setup

const query = new QueryBuilder(UserModel)

beforeEach(() => {
  query.reset()
})

// #endregion

describe('db/query', () => {
  it('should return empty query', () => {
    expect(query.conditions()).toEqual({})
  })

  // #region Comparison

  describe('eq', () => {
    it('should return empty query', () => {
      expect(query.eq('isMock').conditions()).toEqual({})
    })

    it('should return query (boolean)', () => {
      expect(query.eq('isMock', true).conditions()).toEqual({
        isMock: true
      })
    })

    it('should return query (number)', () => {
      expect(query.eq('auth', 5000).conditions()).toEqual({
        auth: 5000
      })
    })

    it('should return query (string)', () => {
      expect(query.eq('email', 'test@myapp.com').conditions()).toEqual({
        email: 'test@myapp.com'
      })
    })

    it('should return query (object)', () => {
      const phone: PhoneNumberFilter = { cc: '1', dc: '111', sn: '1111111' }
      expect(query.eq('phone', phone).conditions()).toEqual({
        phone
      })
    })

    it('should return query (object/falsy)', () => {
      const phone: PhoneNumberFilter = { cc: '1', dc: '100', sn: '' }
      expect(query.eq('phone', phone, 'falsy').conditions()).toEqual({
        phone: pick(phone, ['cc', 'dc'])
      })
    })

    it('should return query (object/nil)', () => {
      const phone: PhoneNumberFilter = { cc: '1', dc: '100' }
      expect(query.eq('phone', phone, 'nil').conditions()).toEqual({
        phone: pick(phone, ['cc', 'dc'])
      })
    })
  })

  describe('gt', () => {
    it('should return empty query', () => {
      expect(query.gt('auth').conditions()).toEqual({})
    })

    it('should return query (number)', () => {
      expect(query.gt('auth', 0).conditions()).toEqual({
        auth: { $gt: 0 }
      })
    })

    it('should return query (date)', () => {
      const date = new Date()
      expect(query.gt('createdAt', date).conditions()).toEqual({
        createdAt: { $gt: date }
      })
    })
  })

  describe('gte', () => {
    it('should return empty query', () => {
      expect(query.gte('auth').conditions()).toEqual({})
    })

    it('should return query (number)', () => {
      expect(query.gte('auth', 0).conditions()).toEqual({
        auth: { $gte: 0 }
      })
    })

    it('should return query (date)', () => {
      const date = new Date()
      expect(query.gte('createdAt', date).conditions()).toEqual({
        createdAt: { $gte: date }
      })
    })
  })

  describe('in', () => {
    it('should return empty query', () => {
      expect(query.in('roles').conditions()).toEqual({})
    })

    it('should return empty query (empty array)', () => {
      expect(query.in('roles', []).conditions()).toEqual({})
    })

    it('should return query', () => {
      expect(query.in('roles', [UserRole.USER]).conditions()).toEqual({
        roles: { $in: [UserRole.USER] }
      })
    })
  })

  describe('lt', () => {
    it('should return empty query', () => {
      expect(query.lt('auth').conditions()).toEqual({})
    })

    it('should return query (number)', () => {
      expect(query.lt('auth', 0).conditions()).toEqual({
        auth: { $lt: 0 }
      })
    })

    it('should return query (date)', () => {
      const date = new Date()
      expect(query.lt('createdAt', date).conditions()).toEqual({
        createdAt: { $lt: date }
      })
    })
  })

  describe('lte', () => {
    it('should return empty query', () => {
      expect(query.lte('auth').conditions()).toEqual({})
    })

    it('should return query (number)', () => {
      expect(query.lte('auth', 0).conditions()).toEqual({
        auth: { $lte: 0 }
      })
    })

    it('should return query (date)', () => {
      const date = new Date()
      expect(query.lte('createdAt', date).conditions()).toEqual({
        createdAt: { $lte: date }
      })
    })
  })

  describe('ne', () => {
    it('should return empty query', () => {
      expect(query.ne('isMock').conditions()).toEqual({})
    })

    it('should return query (boolean)', () => {
      expect(query.ne('isMock', true).conditions()).toEqual({
        isMock: { $ne: true }
      })
    })

    it('should return query (number)', () => {
      expect(query.ne('auth', 0).conditions()).toEqual({
        auth: { $ne: 0 }
      })
    })

    it('should return query (string)', () => {
      expect(query.ne('email', 'test@myapp.com').conditions()).toEqual({
        email: { $ne: 'test@myapp.com' }
      })
    })
  })

  // #endregion

  // #region Logical

  describe('and', () => {
    it('should return empty query', () => {
      expect(query.and().conditions()).toEqual({})
    })

    it('should return query', () => {
      expect(
        query
          .and([{ isMock: { $eq: true } }, { isDeactivated: { $ne: true } }])
          .conditions()
      ).toEqual({
        $and: [{ isMock: { $eq: true } }, { isDeactivated: { $ne: true } }]
      })
    })
  })

  // #endregion

  // #region Element
  // #endregion

  // #region Evaluation

  describe('regex', () => {
    it('should return empty query', () => {
      expect(query.regex('email').conditions()).toEqual({})
    })

    it('should return query (remove=default)', () => {
      expect(query.regex('email', 'test@myapp.com').conditions()).toEqual({
        email: { $regex: /test@myapp.com/gi }
      })
    })

    it('should return query (remove=email)', () => {
      expect(
        query
          .regex('email', 'test!@myapp.com', { remove: SANITIZE.email })
          .conditions()
      ).toEqual({
        email: { $regex: /test@myapp.com/gi }
      })
    })
  })

  // #endregion

  // #region Custom

  describe('between', () => {
    it('should return empty query', () => {
      expect(query.between('createdAt').conditions()).toEqual({})
    })

    it('should return empty query (undefined range)', () => {
      expect(query.between('createdAt', {}).conditions()).toEqual({})
    })

    it('should return query (min/default)', () => {
      const filter: DateRangeFilter = { min: new Date() }
      expect(query.between('createdAt', filter).conditions()).toEqual({
        createdAt: { $gte: filter.min }
      })
    })

    it('should return query (min/custom)', () => {
      const filter: DateRangeFilter = { min: new Date() }
      const options: BetweenOptions = { min: false }
      expect(query.between('createdAt', filter, options).conditions()).toEqual({
        createdAt: { $gt: filter.min }
      })
    })

    it('should return query (max/default)', () => {
      const filter: DateRangeFilter = { max: new Date() }
      expect(query.between('createdAt', filter).conditions()).toEqual({
        createdAt: { $lt: filter.max }
      })
    })

    it('should return query (max/custom)', () => {
      const filter: DateRangeFilter = { max: new Date() }
      const options: BetweenOptions = { max: true }
      expect(query.between('createdAt', filter, options).conditions()).toEqual({
        createdAt: { $lte: filter.max }
      })
    })

    it('should return query (min,max)', () => {
      const filter: DateRangeFilter = { min: new Date(), max: new Date() }
      expect(query.between('createdAt', filter).conditions()).toEqual({
        $and: [
          { createdAt: { $gte: filter.min } },
          { createdAt: { $lt: filter.max } }
        ]
      })
    })
  })

  // #endregion
})
