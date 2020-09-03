import { createServer } from 'http'
import { DB_INIT, DB_URI, HTTP_URL, PORT } from './config'
import { connect, initialize } from './db'
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
  logger.info('Starting the server')

  // Connect to database
  const db = await connect(DB_URI)
  logger.success('Database connection')

  // Initialize the database
  await initialize(db, DB_INIT)

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
