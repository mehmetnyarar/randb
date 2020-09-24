import { getPhoneNumber, isDefaultPhoneNumber } from '~/models/embed/phone'

describe('models/embed/phone/utility', () => {
  describe('getPhoneNumber', () => {
    it('should return stringified person name', () => {
      const result = getPhoneNumber({ cc: '1', dc: '100', sn: '1001010' })
      expect(result).toBe('+11001001010')
    })
  })

  describe('isDefaultPhoneNumber', () => {
    it('should return true (no number)', () => {
      expect(isDefaultPhoneNumber()).toBeTruthy()
    })

    it('should return true (default number)', () => {
      expect(isDefaultPhoneNumber({ cc: '', dc: '', sn: '' })).toBeTruthy()
    })

    it('should return false (valid number)', () => {
      expect(
        isDefaultPhoneNumber({ cc: '1', dc: '111', sn: '1111111' })
      ).toBeFalsy()
    })
  })
})
