import { join } from 'path'
import { buildSchema } from 'type-graphql'
import { ROOT_DIR } from '~/config'
import { authChecker } from './auth'
import { globalMiddlewares } from './middlewares'
import { scalarsMap } from './scalars'

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
