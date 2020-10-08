import { isUserAuthorized, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'
import { AppLink } from '~/types'
import { TopologyView } from '../network'
import { SidebarSection as Section } from './sidebar-section'

interface SidebarLink extends AppLink {
  roles?: UserRole[]
}

interface SidebarNavSection {
  label: string
  roles: UserRole[]
  links: SidebarLink[]
}

type SidebarNav = SidebarNavSection[]

const nav: SidebarNav = [
  {
    label: 'manage.network',
    roles: [UserRole.SA, UserRole.ADMIN, UserRole.MANAGER],
    links: [
      {
        path: '/network/import',
        title: 'screen.network.import',
        description: 'screen.network.import.description'
      }
    ]
  },
  {
    label: 'manage.users',
    roles: [UserRole.SA, UserRole.ADMIN],
    links: [
      {
        path: '/users',
        title: 'screen.users',
        description: 'screen.users.description'
      },
      {
        as: '/users/new',
        path: { pathname: '/users/[username]', query: { username: 'new' } },
        title: 'screen.user.new',
        description: 'screen.user.new.description'
      }
    ]
  }
]

interface Props {
  roles: UserRole[]
}

/**
 * Sidebar.
 */
export const Sidebar: React.FC<Props> = ({ roles }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  return (
    <>
      <aside id='sidebar' className='sidebar'>
        <Section title={t('network')}>
          <TopologyView />
        </Section>
        <nav role='navigation' aria-label='Sidebar Navigation'>
          {nav.map((section, sectionIndex) => {
            return isUserAuthorized(section.roles, roles) ? (
              <Section key={sectionIndex} title={t(section.label)}>
                {section.links.map((item, itemIndex) => {
                  return isUserAuthorized(item.roles, roles) ? (
                    <Link key={itemIndex} href={item.path} as={item.as}>
                      <a title={t(item.description)}>{t(item.title)}</a>
                    </Link>
                  ) : null
                })}
              </Section>
            ) : null
          })}
        </nav>
      </aside>

      <style jsx>
        {`
          .sidebar {
            padding: 16px 8px;
            min-width: 200px;
            align-self: stretch;
            background: ${palette['background-basic-color-2']};
            border-right: 1px solid ${palette['border-basic-color-3']};
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }

          .sidebar nav {
          }
          .sidebar nav a {
            padding: 8px;
          }
        `}
      </style>
    </>
  )
}
