import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { apolloClient } from './apollo'
import { HomeScreen } from './screens/main'

/**
 * Application.
 */
export default function App () {
  return (
    <ApolloProvider client={apolloClient}>
      <HomeScreen />
      <StatusBar style='auto' />
    </ApolloProvider>
  )
}
