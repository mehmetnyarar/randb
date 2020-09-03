import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'db/seed',
  file: 'info'
})

/**
 * Seeds database with initial data.
 * (Drops the existing database and creates a new one).
 */
export const seed = async () => {
  logger.todo('Add seed logic')
}
