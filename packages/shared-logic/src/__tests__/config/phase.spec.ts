import { isDevelopment, isProduction, isTest } from '~/config/phase'

describe('config/phase', () => {
  describe('isDevelopment', () => {
    it('should return false (process.env)', () => {
      expect(isDevelopment()).toBeFalsy()
    })

    it('should return false (production)', () => {
      expect(isDevelopment('production')).toBeFalsy()
    })

    it('should return true (development)', () => {
      expect(isDevelopment('development')).toBeTruthy()
    })
  })

  describe('isProduction', () => {
    it('should return false (process.env)', () => {
      expect(isProduction()).toBeFalsy()
    })

    it('should return false (development)', () => {
      expect(isProduction('development')).toBeFalsy()
    })

    it('should return true (production)', () => {
      expect(isProduction('production')).toBeTruthy()
    })
  })

  describe('isTest', () => {
    it('should return false (process.env)', () => {
      expect(isTest()).toBeTruthy()
    })

    it('should return false (development)', () => {
      expect(isTest('development')).toBeFalsy()
    })

    it('should return true (production)', () => {
      expect(isTest('production')).toBeFalsy()
    })
  })
})
