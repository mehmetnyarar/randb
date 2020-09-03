import { ApolloServer } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'
import { GRAPHQL_CONFIG, isDevelopment, Phase } from '~/config'
import { context } from './context'

/**
 * Creates an Apollo server.
 * @param schema GraphQL schema.
 * @param [phase] Application phase.
 * @returns Apollo server.
 */
export const createApolloServer = async (
  schema: GraphQLSchema,
  phase?: Phase
) => {
  const dev = isDevelopment(phase)
  return new ApolloServer({
    schema,
    context,
    tracing: dev,
    playground: dev,
    introspection: dev,
    ...GRAPHQL_CONFIG
  })
}
