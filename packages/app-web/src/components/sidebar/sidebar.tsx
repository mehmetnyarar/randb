import { isUserAuthorized, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'
import { AppLink } from '~/types'
import { TopologyView } from '../network'
import { Section } from './section'

interface SidebarItem extends AppLink {
  roles?: UserRole[]
}

interface SidebarSection {
  label: string
  roles: UserRole[]
  items: SidebarItem[]
}

const sections: SidebarSection[] = [
  // {
  //   label: 'network',
  //   roles: Object.values(UserRole),
  //   items: [
  //     {
  //       path: '/sites',
  //       title: 'screen.sites',
  //       description: 'screen.sites.description'
  //     },
  //     {
  //       path: '/cells',
  //       title: 'screen.cells',
  //       description: 'screen.sites.description'
  //     }
  //   ]
  // },
  {
    label: 'manage.network',
    roles: [UserRole.SA, UserRole.ADMIN, UserRole.MANAGER],
    items: [
      {
        path: '/import',
        title: 'screen.import',
        description: 'screen.import.description'
      }
    ]
  },
  {
    label: 'manage.users',
    roles: [UserRole.SA, UserRole.ADMIN],
    items: [
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
        <Section title={t('network')} flex={1} overflow>
          <TopologyView />
        </Section>
        <nav role='navigation' aria-label='Sidebar Navigation'>
          {sections.map((section, sectionIndex) => {
            return isUserAuthorized(section.roles, roles) ? (
              <Section key={sectionIndex} title={t(section.label)}>
                {section.items.map((item, itemIndex) => {
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
            border-right: 1px solid ${palette['background-basic-color-4']};
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            overflow: hidden;
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
