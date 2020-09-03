import { Mongoose } from 'mongoose'
import { Logger } from '~/logger'
import { LogModel, UserModel } from '~/models'

const logger = Logger.create({
  src: 'db/reset',
  file: 'info'
})

/**
 * Drops the existing database and creates a new one.
 * @param db Database.
 */
export const reset = async (db: Mongoose) => {
  await db.connection.dropDatabase()
  logger.success('Drop database')

  await LogModel.createCollection()
  await UserModel.createCollection()
  logger.success('Create collections')
}
