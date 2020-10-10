import {
  initializeApolloClient,
  Logger,
  Snack,
  useCell,
  UserRole
} from '@app/logic'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Layout } from '~/components/layout'
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
  const name = router.query.name as string
  logger.debug('render', { name })

  const { show } = useContext(Snack)
  const { error, result, loading } = useCell({ name })

  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(e => t(e)).join('. ')
      })
    }
  }, [t, show, error])

  return (
    <>
      <Layout title={name} roles={[UserRole.SA, UserRole.ADMIN]}>
        {loading && <span>...</span>}
        {result && (
          <main role='main'>
            <CellDetails value={result} />
          </main>
        )}
      </Layout>

      <style jsx>
        {`
          main {
            padding: 32px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }

          .ne-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
        `}
      </style>
    </>
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
