import {
  getColorPalette,
  getCssColor,
  isCssColor,
  isMappedColor
} from '~/theme/utility'

describe('theme/utility', () => {
  describe('isCssColor', () => {
    it('should return false (no value)', () => {
      expect(isCssColor()).toBeFalsy()
    })

    it('should return false (invalid value)', () => {
      expect(isCssColor('red')).toBeFalsy()
    })

    it('should return true (hex)', () => {
      expect(isCssColor('#000000')).toBeTruthy()
    })

    it('should return true (rgba)', () => {
      expect(isCssColor('rgba(0,0,0,0)')).toBeTruthy()
    })
  })

  describe('isMappedColor', () => {
    it('should return false (no value)', () => {
      expect(isMappedColor()).toBeFalsy()
    })

    it('should return false (invalid value)', () => {
      expect(isMappedColor('red')).toBeFalsy()
    })

    it('should return true (dollar)', () => {
      expect(isMappedColor('$somecolor')).toBeTruthy()
    })

    it('should return true (hyphen)', () => {
      expect(isMappedColor('some-color')).toBeTruthy()
    })
  })

  describe('getCssColor', () => {
    const palette = getColorPalette('light')

    it('should return empty string', () => {
      expect(getCssColor(palette)).toBe('')
    })

    it('should return css color (css color)', () => {
      expect(getCssColor(palette, palette['color-primary-100'])).toBeTruthy()
    })

    it('should return css color (mapped color)', () => {
      expect(getCssColor(palette, palette['text-primary-color'])).toBeTruthy()
    })

    it('should return red', () => {
      expect(getCssColor(palette, 'black')).toBe('red')
    })
  })

  describe('getColorPalette', () => {
    it('should create a dark theme', () => {
      expect(getColorPalette('dark')).toBeTruthy()
    })

    it('should create a light theme', () => {
      expect(getColorPalette('light')).toBeTruthy()
    })
  })
})
