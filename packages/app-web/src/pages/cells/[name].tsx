import {
  initializeApolloClient,
  Logger,
  Snack,
  useCell,
  UserRole
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { RiWifiLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { CellDetails } from '~/components/network'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

const logger = Logger.create({
  src: 'CellScreen'
})

/**
 * Cell screen.
 */
export const CellScreen: NextScreen = ({ t }) => {
  const router = useRouter()
  const { show } = useContext(Snack)

  const name = router.query.name as string
  const { error, result, loading } = useCell({ name })

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
    <Layout title={t('screen.cell')} roles={[UserRole.SA, UserRole.ADMIN]}>
      <Main
        icon={<RiWifiLine />}
        title={t('screen.cell')}
        query={name}
        loading={loading}
      >
        {result && <CellDetails value={result} />}
      </Main>
    </Layout>
  )
}

/**
 * Initial props.
 */
CellScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(CellScreen)
