import {
  initializeApolloClient,
  Logger,
  Snack,
  UserRole,
  useSite
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { RiBaseStationLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { SiteDetails } from '~/components/network'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

const logger = Logger.create({
  src: 'SiteScreen'
})

/**
 * Site screen.
 */
export const SiteScreen: NextScreen = ({ t }) => {
  const router = useRouter()
  const { show } = useContext(Snack)

  const name = router.query.name as string
  const { error, result, loading } = useSite({ name })

  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(e => t(e)).join('. ')
      })
    }
  }, [t, show, error])

  logger.debug('render', { name })

  return (
    <Layout title={t('screen.site')} roles={[UserRole.SA, UserRole.ADMIN]}>
      <Main
        icon={<RiBaseStationLine />}
        title={t('screen.site')}
        query={name}
        loading={loading}
      >
        {result && <SiteDetails value={result} />}
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
SiteScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(SiteScreen)
