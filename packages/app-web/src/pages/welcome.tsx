import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Welcome (landing) screen.
 */
export const WelcomeScreen: NextScreen = ({ t }) => {
  return (
    <Layout title={t('screen.welcome')}>
      <Main justify='center' align='center'>
        <p>{t('welcome')}</p>
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
WelcomeScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(WelcomeScreen)
