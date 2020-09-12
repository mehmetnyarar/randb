import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@app/ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import { useApollo } from '~/apollo'

/**
 * Next application.
 * @param props Props.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ThemeProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
