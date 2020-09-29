import { ApolloProvider } from '@apollo/client'
import {
  AuthProvider,
  isBrowser,
  Logger,
  RequestOrigin,
  SnackProvider
} from '@app/logic'
import { ThemeProvider } from '@app/ui'
import cookies from 'next-cookies'
import NextApp, { AppContext, AppProps } from 'next/app'
import React from 'react'
import ReactModal from 'react-modal'
import { useApollo } from '~/apollo'
import { SnackBar } from '~/components/snackbar'
import { appWithTranslation } from '~/i18n'

const logger = Logger.create({
  src: 'App'
})

if (isBrowser()) ReactModal.setAppElement('body')

/**
 * Next application.
 * @param props Props.
 */
function App ({ Component, pageProps }: AppProps) {
  const { language, initialApolloState } = pageProps
  const apolloClient = useApollo(language, initialApolloState)

  logger.debug('render', { pageProps })

  return (
    <ThemeProvider>
      <SnackProvider>
        <ApolloProvider client={apolloClient}>
          <AuthProvider origin={RequestOrigin.WEB}>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
        <SnackBar />
      </SnackProvider>
    </ThemeProvider>
  )
}

// Required for next-i18next
// https://nextjs.org/docs/basic-features/typescript
// https://github.com/isaachinman/next-i18next/blob/master/examples/simple/pages/_app.js
App.getInitialProps = async (appContext: AppContext) => {
  const language = cookies(appContext.ctx)['next-i18next']
  const appProps = await NextApp.getInitialProps(appContext)
  logger.debug('getInitialProps', { appProps, language })

  return {
    ...appProps,
    pageProps: {
      language,
      ...appProps.pageProps
    }
  }
}

export default appWithTranslation(App)
