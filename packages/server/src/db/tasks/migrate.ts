import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'db/migrate',
  file: 'info'
})

/**
 * Applies changes to the database.
 */
export const migrate = async () => {
  logger.todo('Add migrations logic')
}
