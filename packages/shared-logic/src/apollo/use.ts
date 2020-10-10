import { useMemo } from 'react'
import { Logger } from '../logger'
import { initializeApolloClient } from './client'
import { ApolloOptions } from './types'

const logger = Logger.create({
  src: 'apollo/use'
})

/**
 * ApolloClient hook.
 * @param [options={}] Options.
 * @returns ApolloClient.
 */
export const useApolloClient = (options: ApolloOptions = {}) => {
  const client = useMemo(() => initializeApolloClient(options), [options])
  logger.debug('', { options })

  return client
}
