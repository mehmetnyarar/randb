import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { RiHomeLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Home screen.
 */
export const HomeScreen: NextScreen = ({ t }) => {
  return (
    <Layout title={t('screen.home')}>
      <Main
        title={t('screen.home')}
        icon={<RiHomeLine />}
        justify='center'
        align='center'
      >
        <p>{t('welcome')}</p>
      </Main>
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
