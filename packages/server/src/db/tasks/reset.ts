import { Mongoose } from 'mongoose'
import { Logger } from '~/logger'
import {
  AntennaModel,
  BscModel,
  CellModel,
  LacModel,
  LogModel,
  RncModel,
  SiteModel,
  TacModel,
  UserModel
} from '~/models'

const logger = Logger.create({
  src: 'db/reset',
  file: 'info'
})

const DROP_COLLECTIONS = false
const CREATE_COLLECTIONS = false

/**
 * Drops the existing database and creates a new one.
 * @param db Database.
 */
export const reset = async (db: Mongoose) => {
  if (DROP_COLLECTIONS) {
    const collections = Object.keys(db.connection.collections)
    await Promise.all(
      collections.map(async name => {
        logger.debug(`Drop collection: ${name}`)
        await db.connection.dropCollection(name)
      })
    )
    logger.success('Drop collections')
  }

  await db.connection.dropDatabase()
  logger.success('Drop database')

  if (CREATE_COLLECTIONS) {
    await LogModel.createCollection()
    await UserModel.createCollection()
    await AntennaModel.createCollection()
    await BscModel.createCollection()
    await RncModel.createCollection()
    await TacModel.createCollection()
    await LacModel.createCollection()
    await SiteModel.createCollection()
    await CellModel.createCollection()
    logger.success('Create collections')
  }
}
