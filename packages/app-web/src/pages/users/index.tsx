import {
  Auth,
  getUserFilter,
  Logger,
  Snack,
  usePagedUsers,
  UserRole,
  UserSearchBy
} from '@app/logic'
import React, { useContext, useEffect } from 'react'
import { initializeApollo } from '~/apollo'
import { GhostButton, InfoButton } from '~/components/button'
import { Layout } from '~/components/layout'
import { Loading } from '~/components/loading'
import { UserCard } from '~/components/user'
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
  const { user: currentUser } = useContext(Auth)
  const {
    initializing,
    loading,
    result,
    error,
    find,
    filter,
    search,
    onSearchByChange,
    onSearchTextChange,
    advanceSearch,
    toggleAdvanceSearch,
    onDelete
  } = usePagedUsers()

  useEffect(() => {
    if (error) {
      show({
        type: 'error',
        content: error.messages.map(m => t(m)).join('. ')
      })
    }
  }, [t, show, error])

  logger.debug('render', { initializing, loading, result, error })

  return (
    <Layout title={t('screen.users')} roles={[UserRole.SA, UserRole.ADMIN]}>
      <main role='main'>
        {initializing && <span>{t('initializing')}</span>}
        {result && (
          <>
            <section id='search' className='search'>
              <div className='search-box'>
                <input
                  type='search'
                  value={search.text}
                  onChange={e => onSearchTextChange(e.target.value)}
                />
                <select
                  value={search.by}
                  onChange={e => onSearchByChange(e.target.value as any)}
                >
                  {Object.values(UserSearchBy).map((option, i) => (
                    <option key={i} value={option}>
                      {t(`user.search.by.${option}`)}
                    </option>
                  ))}
                </select>
                <InfoButton
                  width={100}
                  onClick={() => {
                    const query = getUserFilter(search, filter)
                    console.log('search', { query })
                    find(query)
                  }}
                >
                  {loading ? <Loading icon spin /> : t('search')}
                </InfoButton>
              </div>
              <div className='search-status'>
                <span>{loading ? t('loading') : ''}</span>
                <GhostButton disabled onClick={toggleAdvanceSearch}>
                  {t('search.advance')}
                </GhostButton>
              </div>
              {advanceSearch && <aside className='search-advance' />}
            </section>
            <section id='results' className='results'>
              {result.edges
                .map(edge => edge.node)
                .map((user, i) => (
                  <UserCard
                    key={i}
                    user={user}
                    onDelete={onDelete}
                    isDisabled={currentUser?.id === user.id}
                  />
                ))}
            </section>
          </>
        )}
      </main>

      <style jsx>
        {`
          main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 32px;
          }

          .search {
            margin-bottom: 32px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
          .search-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .search-box input {
            flex: 1;
          }
          .search-box select {
            margin: 0 16px;
            padding: 8px 16px;
          }
          .search-box .button {
            margin-left: 16px;
          }

          .search-status {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            display: none;
          }

          .search-advance {
          }

          .results {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
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
