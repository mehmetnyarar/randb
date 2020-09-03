import { Mongoose } from 'mongoose'
import { migrate, mock, reset, seed } from './tasks'

/**
 * Initializes the database.
 * @param db Database.
 * @param [tasks] Tasks to execute.
 */
export const initialize = async (db: Mongoose, tasks?: string) => {
  if (!tasks) return

  const shouldResetDatabase = tasks.includes('reset') || tasks.includes('seed')

  if (shouldResetDatabase) await reset(db)
  if (tasks.includes('seed')) await seed()
  if (tasks.includes('mock')) await mock()
  if (tasks.includes('migrate')) await migrate()
}
