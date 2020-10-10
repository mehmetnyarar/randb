import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { RiInformationLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * About screen.
 */
export const AboutScreen: NextScreen = ({ t }) => {
  return (
    <Layout title={t('screen.about')}>
      <Main
        title={t('screen.about')}
        icon={<RiInformationLine />}
        justify='center'
        align='center'
      >
        <p>{t('app.name')}</p>
        <p>{t('app.version')}</p>
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
AboutScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(AboutScreen)
