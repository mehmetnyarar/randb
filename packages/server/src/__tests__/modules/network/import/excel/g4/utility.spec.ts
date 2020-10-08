import { sample, times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db'
import { Cell4GBand, CellModel, Scenario, SiteModel, TacModel } from '~/models'
import { excel } from '~/modules/network/import'

// #region Setup

const defaultItem: excel.g4.Item = {
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

const data: excel.g4.Item[] = times(12, n => {
  let site = 1
  let sector = 'A'
  const cell = n + 1

  if (cell >= 4 && cell < 7) site = 2
  else if (cell >= 7 && cell < 10) site = 3
  else if (cell >= 10) site = 4

  const remain = cell % 3
  if (remain === 0) sector = 'C'
  else if (remain === 1) sector = 'A'
  else sector = 'B'

  const siteName = `SITE0${site}`
  const cellName = `A-SITE0${site}${sector}0-L0`

  const item: excel.g4.Item = {
    ...defaultItem,
    TAC: 'TAC1',
    'Site ID': '0',
    'Site Name': siteName,
    'Cell ID': `${10000 + cell}`,
    'Cell Name': cellName,
    'Frequency Band': sample(Object.values(Cell4GBand)),
    Scenario: sample(Object.values(Scenario))
  }

  return item
})

let server: MongoMemoryServer
let mongoose: Mongoose

beforeAll(async () => {
  server = new MongoMemoryServer()
  mongoose = await connect(await server.getUri())
})

afterAll(async () => {
  await mongoose.disconnect()
  await server.stop()
})

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

describe('modules/network/import/excel/g4', () => {
  it('should import data', async () => {
    await excel.g4.from('')

    expect(await TacModel.find()).toHaveLength(1)
    expect(await SiteModel.find()).toHaveLength(4)
    expect(await CellModel.find()).toHaveLength(12)
  })

  test.todo('Create a test for invalid item')
})
