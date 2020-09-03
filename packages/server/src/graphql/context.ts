import { GRAPHQL_AUTH } from '~/config'
import { GraphQLContext, GraphQLContextFunction } from './types'

/**
 * Creates a GraphQL context.
 * @param params Context parameters.
 * @returns GraphQL context.
 */
export const context: GraphQLContextFunction = async params => {
  // Create context for subscriptions
  const { connection } = params
  if (connection) {
    return connection.context
  }

  // Create context for queries and mutations
  const { req, res } = params
  const ctx: GraphQLContext = {
    req,
    res,
    auth: GRAPHQL_AUTH,
    currentUser: req.user
  }

  return ctx
}
