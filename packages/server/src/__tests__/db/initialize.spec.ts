import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { connect } from '~/db/connect'
import { initialize } from '~/db/initialize'
import * as run from '~/db/tasks'

// #region Setup

jest.mock('~/db/tasks', () => ({
  migrate: jest.fn(),
  mock: jest.fn(),
  reset: jest.fn(),
  seed: jest.fn()
}))

let db: Mongoose
let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = new MongoMemoryServer()
  db = await connect(await mongo.getUri())
})

beforeEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  jest.restoreAllMocks()
  if (db) await db.disconnect()
  if (mongo) await mongo.stop()
})

// #endregion

describe('db/initialize', () => {
  it('should skip (no tasks)', async () => {
    await initialize(db)
    expect(run.migrate).not.toHaveBeenCalled()
    expect(run.mock).not.toHaveBeenCalled()
    expect(run.reset).not.toHaveBeenCalled()
    expect(run.seed).not.toHaveBeenCalled()
  })

  it('should reset', async () => {
    await initialize(db, 'reset')
    expect(run.migrate).not.toHaveBeenCalled()
    expect(run.mock).not.toHaveBeenCalled()
    expect(run.reset).toHaveBeenCalled()
    expect(run.seed).not.toHaveBeenCalled()
  })

  it('should seed', async () => {
    await initialize(db, 'seed')
    expect(run.migrate).not.toHaveBeenCalled()
    expect(run.mock).not.toHaveBeenCalled()
    expect(run.reset).toHaveBeenCalled()
    expect(run.seed).toHaveBeenCalled()
  })

  it('should mock', async () => {
    await initialize(db, 'mock')
    expect(run.migrate).not.toHaveBeenCalled()
    expect(run.mock).toHaveBeenCalled()
    expect(run.reset).not.toHaveBeenCalled()
    expect(run.seed).not.toHaveBeenCalled()
  })

  it('should migrate', async () => {
    await initialize(db, 'migrate')
    expect(run.migrate).toHaveBeenCalled()
    expect(run.mock).not.toHaveBeenCalled()
    expect(run.reset).not.toHaveBeenCalled()
    expect(run.seed).not.toHaveBeenCalled()
  })
})
