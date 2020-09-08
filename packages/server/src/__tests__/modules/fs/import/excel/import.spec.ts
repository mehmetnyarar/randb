import { sheet } from '~/modules/fs/import/excel'
import { CellData } from '~/modules/fs/import/types'

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

describe('modules/fs/import/excel/sheet', () => {
  it('should import excel sheet', () => {
    const result = sheet('path-to-file')
    expect(result).toEqual(data)
  })
})
