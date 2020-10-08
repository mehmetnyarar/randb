import { sheet } from '~/modules/fs/excel'
import { CellData } from '~/modules/network/import'

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

// #endregion

describe('modules/fs/excel', () => {
  it('should import excel sheet', () => {
    const result = sheet('path-to-file')
    expect(result).toEqual(data)
  })
})
