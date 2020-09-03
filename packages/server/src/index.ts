import { createServer } from 'http'
import { HTTP_URL, PORT } from './config'
import { app } from './express'
import { Logger } from './logger'
import { ensureDirs } from './modules/fs'

const logger = Logger.create({
  src: 'server',
  file: 'info'
})

/**
 * Starts the server.
 */
const main = async () => {
  // Ensure directories
  await ensureDirs()

  logger.newline()
  logger.info('Starting the server...')

  // Create server
  const httpServer = createServer(app)

  // Run the server
  httpServer
    .listen(PORT, async () => {
      logger.info(`Server is running at ${HTTP_URL}`)
    })
    .on('error', error => {
      throw error
    })
}

// Start the server
main().catch(logger.error)
