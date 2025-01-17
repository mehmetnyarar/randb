import { initializeApolloClient, Network, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { RiDashboardLine } from 'react-icons/ri'
import { Layout, Main } from '~/components/layout'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

const solutions = [
  {
    id: 'nasa',
    title: 'NASA WorldWind',
    href: 'https://worldwind.arc.nasa.gov/web/get-started/'
  },
  {
    id: 'vts',
    title: 'VTS Browser JS',
    href: 'https://github.com/melowntech/vts-browser-js'
  },
  { id: 'cesium', title: 'Cesium', href: 'https://cesium.com/cesiumjs/' },
  { id: 'terria', title: 'Terria', href: 'https://terria.io/' }
]

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
          {Object.keys(neStats).map(stat => {
            const value = neStats[stat]
            if (typeof value === 'undefined') return null

            return (
              <li key={stat} className='ne-stat'>
                <h5>{t(`ne.${stat}`)}</h5>
                <div className='ne-stat-value'>
                  <span>{value}</span>
                </div>
              </li>
            )
          })}
        </ul>

        <h6>Map solutions</h6>
        <ul className='solutions'>
          {solutions.map(item => (
            <li key={item.id}>
              <a href={item.href} target='_blank' rel='noreferrer'>
                {item.title}
              </a>
            </li>
          ))}
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
            width: 64px;
            height: 64px;
            border-radius: 50%;
            border: 4px solid ${palette['border-basic-color-4']};
            background: ${palette['background-basic-color-2']};
            font-size: 24px;
          }

          h6 {
            margin: 32px 0 8px;
          }
          .solutions {
            padding: 0 16px;
            font-size: 12px;
            list-style: disc;
          }

          @media screen and (min-width: 600px) {
            .ne-stat-value {
              width: 128px;
              height: 128px;
              font-size: 32px;
            }
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
