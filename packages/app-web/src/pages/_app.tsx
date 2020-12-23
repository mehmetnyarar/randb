import { ApolloProvider } from '@apollo/client'
import {
  AuthProvider,
  isBrowser,
  Logger,
  NetworkProvider,
  RequestOrigin,
  SearchProvider,
  SnackProvider,
  useApolloClient
} from '@app/logic'
import { ThemeProvider } from '@app/ui'
import NextCookies from 'next-cookies'
import NextApp, { AppContext, AppProps } from 'next/app'
import React from 'react'
import ReactModal from 'react-modal'
import { RecoilRoot } from 'recoil'
import { SnackBar } from '~/components/snackbar'
import { GRAPHQL_API_URL, GRAPHQL_SUBSCRIPTIONS_URL } from '~/config'
import { appWithTranslation } from '~/i18n'
import { getUserAgent } from '~/utility'

const logger = Logger.create({
  src: 'App'
})

if (isBrowser()) ReactModal.setAppElement('body')

/**
 * Next application.
 * @param props Props.
 */
function App ({ Component, pageProps }: AppProps) {
  const { agent, ...apolloOptions } = pageProps
  const apolloClient = useApolloClient({
    ...apolloOptions,
    agent: agent || getUserAgent(),
    apiUrl: GRAPHQL_API_URL,
    subscriptionsUrl: GRAPHQL_SUBSCRIPTIONS_URL
  })

  logger.debug('render', { pageProps, apolloOptions, agent })

  return (
    <RecoilRoot>
      <ThemeProvider>
        <SnackProvider>
          <ApolloProvider client={apolloClient}>
            <AuthProvider origin={RequestOrigin.WEB}>
              <SearchProvider>
                <NetworkProvider>
                  <Component {...pageProps} />
                </NetworkProvider>
              </SearchProvider>
            </AuthProvider>
          </ApolloProvider>
          <SnackBar />
        </SnackProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

// Required for next-i18next
// https://nextjs.org/docs/basic-features/typescript
// https://github.com/isaachinman/next-i18next/blob/master/examples/simple/pages/_app.js
App.getInitialProps = async (appContext: AppContext) => {
  const agent = appContext.ctx.req?.headers['user-agent']
  const cookies = NextCookies(appContext.ctx)
  const language = cookies['next-i18next']
  const accessToken = cookies['access-token']
  const refreshToken = cookies['refresh-token']
  const appProps = await NextApp.getInitialProps(appContext)
  const props = {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      language,
      auth: {
        accessToken,
        refreshToken
      },
      agent: getUserAgent(agent),
      origin: RequestOrigin.WEB
    }
  }

  logger.debug('getInitialProps', { appProps, props })
  return props
}

export default appWithTranslation(App)
