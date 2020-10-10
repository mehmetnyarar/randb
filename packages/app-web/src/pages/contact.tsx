import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { RiPhoneLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Contact screen.
 */
export const ContactScreen: NextScreen = ({ t }) => {
  return (
    <Layout title={t('screen.contact')}>
      <Main
        title={t('screen.contact')}
        icon={<RiPhoneLine />}
        justify='center'
        align='center'
      >
        <p>{t('phone')}</p>
        <p>{t('email')}</p>
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
ContactScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(ContactScreen)
