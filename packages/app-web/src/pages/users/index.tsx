import { Logger, Snack, usePagedUsers, UserRole } from '@app/logic'
import React, { useContext, useEffect } from 'react'
import { initializeApollo } from '~/apollo'
import { Layout } from '~/components/layout'
import { UserList } from '~/components/user'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

const logger = Logger.create({
  src: 'UsersScreen'
})

/**
 * Users screen.
 */
export const UsersScreen: NextScreen = ({ t }) => {
  const { show } = useContext(Snack)
  const { initializing, loading, result, error } = usePagedUsers()

  logger.debug('render', { initializing, loading, result, error })

  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(m => t(m)).join('. ')
      })
    }
  }, [t, show, error])

  return (
    <Layout title={t('screen.users')} roles={[UserRole.ADMIN]}>
      <main role='main'>
        {initializing && <span>{t('initializing')}</span>}
        {loading && <span>{t('loading')}</span>}
        {result && <UserList users={result.edges.map(edge => edge.node)} />}
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 32px;
          }
        `}
      </style>
    </Layout>
  )
}

/**
 * Initial props.
 */
UsersScreen.getInitialProps = async () => {
  const apolloClient = initializeApollo()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(UsersScreen)
