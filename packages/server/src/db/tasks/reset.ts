import { Mongoose } from 'mongoose'
import { Logger } from '~/logger'
import {
  AntennaModel,
  BscModel,
  Cell2GModel,
  Cell3GModel,
  Cell4GModel,
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

/**
 * Drops the existing database and creates a new one.
 * @param db Database.
 */
export const reset = async (db: Mongoose) => {
  await db.connection.dropCollection('logs')
  await db.connection.dropCollection('users')
  await db.connection.dropDatabase()
  logger.success('Drop database')

  await LogModel.createCollection()
  await UserModel.createCollection()

  await AntennaModel.createCollection()
  await BscModel.createCollection()
  await Cell2GModel.createCollection()
  await Cell3GModel.createCollection()
  await Cell4GModel.createCollection()
  await LacModel.createCollection()
  await RncModel.createCollection()
  await SiteModel.createCollection()
  await TacModel.createCollection()

  logger.success('Create collections')
}
