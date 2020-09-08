import { Cell4GBand } from '~/models'
import { g4 } from '~/modules/fs/import/excel'
import { CellData } from '~/modules/fs/import/types'
import {
  getCellNameInfo,
  getError,
  validate
} from '~/modules/fs/import/utility'

// #region Setup

const data: CellData[] = []
jest.mock('xlsx', () => ({
  readFile: () => ({
    SheetNames: ['test'],
    Sheets: {
      test: data
    }
  }),
  utils: {
    sheet_to_json: () => data
  }
}))

const item: g4.Item = {
  TAC: '',
  'Site ID': '',
  'Site Name': '',
  'Cell ID': '',
  'Cell Name': '',
  Longitude: 0,
  Latitude: 0,
  'Antenna Type': '',
  Height: 0,
  Azimuth: 0,
  'Mechanical Downtilt': 0,
  'Electrical Downtilt': 0,
  PCI: '0',
  'Frequency Band': '',
  DlEarfcn: '0',
  'DlBandwidth(MHz)': 0,
  'Channel Index': 0,
  'RS Power(dBm)': 0,
  'Max Power(dBm)': 0,
  Scenario: '',
  Active: true
}

// #endregion

describe('modules/fs/import/utility', () => {
  describe('getError', () => {
    it('should determine the field error', () => {
      expect(getError('')).toBeUndefined()

      expect(getError(undefined, 'falsy')).toBe('required')
      expect(getError(null, 'falsy')).toBe('required')
      expect(getError('', 'falsy')).toBe('required')
      expect(getError('text', 'falsy')).toBeUndefined()
      expect(getError(0, 'falsy')).toBe('required')
      expect(getError(5, 'falsy')).toBeUndefined()

      expect(getError(undefined, 'nil')).toBe('required')
      expect(getError(null, 'nil')).toBe('required')
      expect(getError('', 'nil')).toBeUndefined()
      expect(getError(0, 'nil')).toBeUndefined()

      expect(getError(undefined, 'numeric')).toBe('invalid')
      expect(getError(null, 'numeric')).toBe('invalid')
      expect(getError('', 'numeric')).toBe('invalid')
      expect(getError('text', 'numeric')).toBe('invalid')
      expect(getError('5.5', 'numeric')).toBeUndefined()

      const fn = (value: string) => value === 'x'
      expect(getError('', fn)).toBeUndefined()
      expect(getError('x', fn)).toBe('invalid')

      const oneOf = ['x', 'y']
      expect(getError('', { oneOf })).toBe('invalid')
      expect(getError('x', { oneOf })).toBeUndefined()
    })
  })

  describe('validate', () => {
    it('should validate', () => {
      let result = validate(item, g4.VALIDATION_RULES)
      expect(result.isValid).toBeFalsy()

      item.TAC = 'G'
      result = validate(item, g4.VALIDATION_RULES)
      expect(result.isValid).toBeFalsy()

      item.TAC = 'TAC'
      item['Site Name'] = 'Site'
      item['Cell ID'] = '10001'
      item['Cell Name'] = 'Cell'
      item['Frequency Band'] = Cell4GBand.FDD1800MHZ10
      item.Scenario = 'Outdoor'

      result = validate(item, g4.VALIDATION_RULES)
      expect(result.isValid).toBeTruthy()
    })
  })

  describe('getCellNameInfo', () => {
    it('should extract info', () => {
      expect(getCellNameInfo('', g4.CELL_NAME_RULES)).toEqual({})
      expect(getCellNameInfo('A-SITE01A1L-1', g4.CELL_NAME_RULES)).toEqual({
        site: 'SITE01',
        sector: 'A',
        n1: '1',
        n2: '1'
      })
    })
  })
})
