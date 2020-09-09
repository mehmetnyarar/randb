import { copyFile, pathExists } from 'fs-extra'
import { GraphQLSchema } from 'graphql'
import { join } from 'path'
import { buildSchema, emitSchemaDefinitionFile } from 'type-graphql'
import { ROOT_DIR } from '~/config'
import { Logger } from '~/logger'
import { authChecker } from './auth'
import { globalMiddlewares } from './middlewares'
import { scalarsMap } from './scalars'

const logger = Logger.create({
  src: 'graphql/schema',
  file: 'info'
})

/**
 * Creates a GraphQL schema.
 * @returns GraphQL schema.
 */
export const createGraphQLSchema = async () => {
  return buildSchema({
    scalarsMap,
    globalMiddlewares,
    authChecker,
    validate: false,
    authMode: 'error',
    dateScalarMode: 'isoDate',
    resolvers: [join(ROOT_DIR, 'src/resolvers/*.ts')]
  })
}

/**
 * Creates GraphQL schema files to generate TS typings.
 * @param schema GraphQL schema.
 * @param path Target directory (relative to ROOT_DIR).
 * @param [create] Create new schema file?
 */
export const createGraphQLSchemaFiles = async (
  schema: GraphQLSchema,
  path: string
) => {
  const root = join(ROOT_DIR, path)
  if (!(await pathExists(root))) return false

  const name = 'schema.graphql'
  const src = join(ROOT_DIR, name)

  // Create file if it doesn't exist
  if (!(await pathExists(src))) {
    try {
      await emitSchemaDefinitionFile(name, schema)
      logger.success('Create file on server')
    } catch (error) {
      logger.error('Failed to create file', { error })
    }
  }

  // Copy to target directory
  try {
    const dest = join(root, name)
    await copyFile(src, dest)

    logger.success(`Copy file to target: ${path}`)
    return true
  } catch (error) {
    logger.error('Failed to copy file', { error })
    return false
  }
}
