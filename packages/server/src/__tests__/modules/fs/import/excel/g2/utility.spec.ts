import { sample, times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db'
import {
  BscModel,
  Cell2GBand,
  Cell2GModel,
  LacModel,
  Scenario,
  SiteModel
} from '~/models'
import { excel } from '~/modules/fs/import'

// #region Setup

const defaultItem: excel.g2.Item = {
  'BSC ID': 0,
  'BSC Name': '',
  LAC: 0,
  'Site ID': '',
  'Site Name': '',
  CI: 0,
  'Cell Name': '',
  Longitude: 0,
  Latitude: 0,
  'Antenna Type': '',
  Height: 0,
  Azimuth: 0,
  'Mechanical Downtilt': 0,
  'Electrical Downtilt': 0,
  MCC: 0,
  MNC: 0,
  NCC: '0',
  BCC: '0',
  'Frequency Band': '',
  BCCH: '0',
  'TRX Number': 0,
  'TRX Power(dBm': 0,
  'Scenario（Indoor or Outdoor）': ''
}

const data: excel.g2.Item[] = times(12, n => {
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

  const item: excel.g2.Item = {
    ...defaultItem,
    'BSC Name': 'BSC1',
    LAC: 1001 + (n % 2),
    'Site ID': '0',
    'Site Name': `SITE0${site}`,
    CI: 10000 + cell,
    'Cell Name': `SITE0${site}${sector}0-G1`,
    'Frequency Band': sample(Object.values(Cell2GBand)),
    'Scenario（Indoor or Outdoor）': sample(Object.values(Scenario))
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

describe('modules/fs/import/excel/g2', () => {
  it('should import data', async () => {
    await excel.g2.from('')

    expect(await BscModel.find()).toHaveLength(1)
    expect(await LacModel.find()).toHaveLength(2)
    expect(await SiteModel.find()).toHaveLength(4)
    expect(await Cell2GModel.find()).toHaveLength(12)
  })

  test.todo('Create a test for invalid item')
})
