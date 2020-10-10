import { initializeApolloClient, useWelcomeQuery } from '@app/logic'
import React from 'react'
import { Layout } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Home screen.
 */
export const HomeScreen: NextScreen = ({ t }) => {
  const { loading, error, data } = useWelcomeQuery()

  return (
    <Layout title={t('home')}>
      <main role='main'>
        <p>{t('welcome')}</p>

        {loading && <p>...</p>}
        {error && <p data-testid='welcome-error'>{t(error.message)}</p>}
        {data?.welcome && <p>{data.welcome}</p>}
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </Layout>
  )
}

/**
 * Initial props.
 */
HomeScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(HomeScreen)
