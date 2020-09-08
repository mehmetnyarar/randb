import { createServer } from 'http'
import 'reflect-metadata'
import {
  CORS_OPTIONS,
  DB_INIT,
  DB_URI,
  GRAPHQL_PATH,
  HTTP_URL,
  PORT,
  WS_URL
} from './config'
import { connect, initialize } from './db'
import { app } from './express'
import { createApolloServer, createGraphQLSchema } from './graphql'
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

  // Initialize the Apollo server
  const schema = await createGraphQLSchema()
  const apolloServer = await createApolloServer(schema)
  apolloServer.applyMiddleware({
    app,
    path: GRAPHQL_PATH,
    cors: CORS_OPTIONS,
    bodyParserConfig: true
  })

  // Create server
  const httpServer = createServer(app)

  // Register GraphQL subscriptions
  apolloServer.installSubscriptionHandlers(httpServer)
  logger.success('Apollo Server')

  // Run the server
  httpServer
    .listen(PORT, async () => {
      logger.info(`Server is running at ${HTTP_URL}`)

      const { graphqlPath, subscriptionsPath } = apolloServer
      logger.info(`GQL API: ${HTTP_URL}${graphqlPath}`)
      logger.info(`GQL Subscriptions: ${WS_URL}${subscriptionsPath}`)
    })
    .on('error', error => {
      throw error
    })
}

// Start the server
main().catch(console.error)
