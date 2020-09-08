import { isNumeric, toFloat, toInt } from '~/utility'

describe('utility/number', () => {
  describe('isNumeric', () => {
    it('should determine', () => {
      expect(isNumeric(undefined)).toBeFalsy()
      expect(isNumeric(null)).toBeFalsy()
      expect(isNumeric(NaN)).toBeFalsy()
      expect(isNumeric('3')).toBeTruthy()
      expect(isNumeric('3.5')).toBeTruthy()
      expect(isNumeric(true)).toBeFalsy()
      expect(isNumeric({})).toBeFalsy()
      expect(isNumeric(new Date())).toBeFalsy()
      expect(isNumeric(new RegExp(''))).toBeFalsy()
    })
  })

  describe('toInt', () => {
    it('should return int', () => {
      expect(toInt('text')).toBe(0)
      expect(toInt('3.55')).toBe(3)
      expect(toInt(3.55)).toBe(3)
    })
  })

  describe('toFloat', () => {
    it('should return float', () => {
      expect(toFloat('text')).toBe(0)
      expect(toFloat('3.55')).toBe(3.55)
      expect(toFloat(3.55)).toBe(3.55)
    })
  })
})
