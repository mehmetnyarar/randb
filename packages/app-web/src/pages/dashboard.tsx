import { initializeApolloClient, Network, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Dashboard screen.
 */
export const DashboardScreen: NextScreen = ({ t }) => {
  const { palette } = useContext(Theme)
  const { neStats } = useContext(Network)

  return (
    <Layout title={t('screen.dashboard')} roles={Object.values(UserRole)}>
      <Main
        icon={<RiDashboardLine />}
        title={t('screen.dashboard')}
        loading={false}
      >
        <ul className='ne-stats'>
          {Object.keys(neStats).map((key, i) => {
            const value = neStats[key]
            if (typeof value === 'undefined') return null

            return (
              <li key={i} className='ne-stat'>
                <h5>{t(`ne.${key}`)}</h5>
                <div className='ne-stat-value'>
                  <span>{value}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </Main>

      <style jsx>
        {`
          .ne-stats {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
          }
          .ne-stat,
          .ne-stat-value {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .ne-stat h5 {
            margin-bottom: 16px;
            font-size: 24px;
          }
          .ne-stat-value {
            width: 128px;
            height: 128px;
            border-radius: 50%;
            border: 8px solid ${palette['border-basic-color-4']};
            background: ${palette['background-basic-color-2']};
            font-size: 32px;
          }
        `}
      </style>
    </Layout>
  )
}

/**
 * Initial props.
 */
DashboardScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(DashboardScreen)
