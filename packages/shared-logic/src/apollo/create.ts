import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createHttpLink } from '@apollo/client/link/http'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { ConnectionParams } from 'subscriptions-transport-ws'
import { isBrowser } from '../config'
import { RequestOrigin } from '../graphql'
import { Logger } from '../logger'
import { ApolloOptions } from './types'
import { getBearerToken, isSubscription, isUpload } from './utility'

const logger = Logger.create({
  src: 'apollo/create'
})

/**
 * Creates a new ApolloClient.
 * @param [options={}] Options.
 * @returns ApolloClient.
 */
export const createApolloClient = (options: ApolloOptions = {}) => {
  const { apiUrl, subscriptionsUrl, auth, language, agent, origin } = options
  const mobile = origin === RequestOrigin.MOBILE
  const browser = isBrowser()
  const isClient = mobile || browser
  logger.debug('create', { browser, mobile, isClient, options })

  // Main HTTP link with cookie authentication
  const httpLink = createHttpLink({
    uri: apiUrl,
    credentials: 'include'
  })

  // Default terminating link
  let terminatingLink = httpLink

  // Support file uploads and subscriptions on the client
  if (isClient) {
    // Uploads
    const uploadLink = createUploadLink({
      uri: apiUrl
    }) as any

    // Subscriptions
    let wsLink: WebSocketLink | undefined
    if (subscriptionsUrl) {
      wsLink = new WebSocketLink({
        uri: subscriptionsUrl,
        options: {
          lazy: true,
          reconnect: true,
          connectionParams: async () => {
            const params: ConnectionParams = {
              language,
              authorization: await getBearerToken(mobile, auth),
              'accept-language': language
            }

            logger.debug('wsLink', { params })
            return params
          }
        }
      })
    }

    // Terminating link
    terminatingLink = wsLink
      ? split(isSubscription, wsLink, split(isUpload, uploadLink, httpLink))
      : split(isUpload, uploadLink, httpLink)
  }

  // Headers
  const headersLink = setContext(async (_, { headers: originalHeaders }) => {
    const headers = {
      ...originalHeaders,
      'accept-language': language,
      authorization: await getBearerToken(mobile, auth),
      language
    }

    logger.debug('headersLink', { headers, originalHeaders })
    return {
      headers
    }
  })

  // Analytics
  const analyticsLink = new ApolloLink((operation, forward) => {
    operation.variables.agent = agent
    operation.variables.origin = origin

    logger.debug('analyticsLink', { operation })
    return forward(operation)
  })

  // Error
  // https://www.apollographql.com/docs/react/api/link/apollo-link-error/
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const headers = operation.getContext().headers
    logger.debug('errorLink', {
      graphQLErrors,
      networkError,
      operation,
      headers
    })
  })

  // Retry
  // https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
  // import { RetryLink } from "@apollo/client/link/retry"
  // const retryLink = new RetryLink()

  const link = from([analyticsLink, headersLink, errorLink, terminatingLink])
  const cache = new InMemoryCache({
    typePolicies: {
      Site: {
        fields: {
          children: {
            merge: false
          }
        }
      }
    }
  })

  return new ApolloClient({
    link,
    cache,
    ssrMode: !isClient,
    connectToDevTools: isClient
  })
}
