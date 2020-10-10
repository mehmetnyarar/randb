import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { RiEye2Line } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Policy screen.
 */
export const PolicyScreen: NextScreen = ({ t }) => {
  return (
    <Layout title={t('screen.policy')}>
      <Main
        title={t('screen.policy')}
        icon={<RiEye2Line />}
        justify='center'
        align='center'
      >
        <p>{t('policy')}</p>
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
PolicyScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(PolicyScreen)
