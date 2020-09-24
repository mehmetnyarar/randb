import { ApolloProvider } from '@apollo/client'
import { AuthProvider, RequestOrigin, SnackProvider } from '@app/logic'
import { ThemeProvider } from '@app/ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import { useApollo } from '~/apollo'
import { SnackBar } from '~/components/snackbar'

/**
 * Next application.
 * @param props Props.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ThemeProvider>
      <SnackProvider>
        <ApolloProvider client={apolloClient}>
          <AuthProvider origin={RequestOrigin.WEB}>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
        <SnackBar />
        <div id='snackbar' />
      </SnackProvider>
    </ThemeProvider>
  )
}

export default App
