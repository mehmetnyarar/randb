import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Logger, storage } from '@app/logic'
import { GRAPHQL_API_URL } from './config'

const logger = Logger.create({
  src: 'apollo'
})

/**
 * Creates a new ApolloClient.
 */
export function createApolloClient () {
  // Cookie authentication
  const httpLink = createHttpLink({
    uri: GRAPHQL_API_URL, // Server URL (must be absolute),
    credentials: 'include' // Additional fetch() options like `credentials` or `headers`
  })

  // Header authentication
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const accessToken = await storage.get('access-token')
    const refreshToken = await storage.get('refresh-token')
    const token = accessToken || refreshToken
    const authorization = token ? `Bearer ${token}` : ''
    logger.debug('authLink', { accessToken, refreshToken, authorization })

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization
      }
    }
  })

  const link = authLink.concat(httpLink)

  return new ApolloClient({
    link,
    cache: new InMemoryCache()
  })
}

const apolloClient = createApolloClient()
export { apolloClient }
