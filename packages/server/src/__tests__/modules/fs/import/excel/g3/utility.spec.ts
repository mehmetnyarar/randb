import { sample, times } from 'lodash'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db'
import {
  Cell3GBand,
  CellModel,
  LacModel,
  RncModel,
  Scenario,
  SiteModel
} from '~/models'
import { excel } from '~/modules/fs/import'

// #region Setup

const defaultItem: excel.g3.Item = {
  'RNC ID': 0,
  'RNC Name': '',
  LAC: 0,
  'Site ID': '',
  'Site Name': '',
  CI: '0',
  'Cell Name': '',
  Longitude: 0,
  Latitude: 0,
  'Antenna Type': '',
  Height: 0,
  Azimuth: 0,
  BeamWidth: 0,
  'Mechanical Downtilt': 0,
  'Electrical Downtilt': 0,
  PSC: '0',
  'Frequency Band': '',
  ARFCN: '0',
  'Total Power(dBm)': 0,
  'Pilot Power(dBm)': 0,
  'Scenario（Indoor or Outdoor）': '',
  Active: true
}

const data: excel.g3.Item[] = times(12, n => {
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
  const cellName = `SITE0${site}${sector}0-U1`

  const item: excel.g3.Item = {
    ...defaultItem,
    'RNC ID': 101,
    'RNC Name': 'RNC101',
    LAC: 1001 + (n % 2),
    'Site ID': '0',
    'Site Name': siteName,
    CI: `${10000 + cell}`,
    'Cell Name': cellName,
    'Frequency Band': sample(Object.values(Cell3GBand)),
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

describe('modules/fs/import/excel/g3', () => {
  it('should import data', async () => {
    await excel.g3.from('')

    expect(await RncModel.find()).toHaveLength(1)
    expect(await LacModel.find()).toHaveLength(2)
    expect(await SiteModel.find()).toHaveLength(4)
    expect(await CellModel.find()).toHaveLength(12)
  })

  test.todo('Create a test for invalid item')
})
