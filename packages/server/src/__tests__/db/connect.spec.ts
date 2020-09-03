import { Mongoose } from 'mongoose'
import { DB_URI } from '~/config'
import { connect } from '~/db/connect'

// #region Setup

let db: Mongoose

afterAll(async () => {
  if (db) await db.disconnect()
})

// #endregion

describe('db/connect', () => {
  // NOTE This requires local MongoDB to run
  it('should connect', async () => {
    db = await connect(DB_URI)
    expect(db).toBeTruthy()
  })
})
