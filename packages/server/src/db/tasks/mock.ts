import { Logger } from '~/logger'

const logger = Logger.create({
  src: 'db/mock',
  file: 'info'
})

/**
 * Creates mock entities.
 */
export const mock = async () => {
  logger.todo('Add mock logic')
}
