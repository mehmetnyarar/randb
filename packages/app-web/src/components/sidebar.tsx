import { UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'
import { AppLink } from '~/types'

interface SidebarItem extends AppLink {
  section?: string
  roles: UserRole[]
  hasSeparator?: boolean
}

const SIDEBAR: SidebarItem[] = [
  {
    section: 'manage.users',
    path: '/users',
    title: 'screen.users',
    description: 'screen.users.description',
    roles: [UserRole.ADMIN],
    hasSeparator: false
  },
  {
    path: '/users/new',
    title: 'screen.users.new',
    description: 'screen.users.new.description',
    roles: [UserRole.ADMIN],
    hasSeparator: true
  },
  {
    section: 'manage.network',
    path: '/sites',
    title: 'screen.sites',
    description: 'screen.sites.description',
    roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    hasSeparator: false
  },
  {
    path: '/cells',
    title: 'screen.cells',
    description: 'screen.sites.description',
    roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    hasSeparator: false
  },
  {
    path: '/import',
    title: 'screen.import',
    description: 'screen.import.description',
    roles: [UserRole.ADMIN, UserRole.MANAGER],
    hasSeparator: false
  }
]

interface Props {}

/**
 * Sidebar.
 */
export const Sidebar: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  return (
    <>
      <section id='sidebar' className='sidebar'>
        <nav role='navigation' aria-label='Sidebar Navigation'>
          {SIDEBAR.map((item, i) => (
            <>
              {item.section && <h3 className='section'>{t(item.section)}</h3>}
              <Link key={i} href={item.path}>
                <a title={item.description}>{t(item.title)}</a>
              </Link>
              {item.hasSeparator && <div className='separator' />}
            </>
          ))}
        </nav>
      </section>

      <style jsx>
        {`
          .sidebar {
            min-width: 200px;
            align-self: stretch;
            background: ${palette['background-basic-color-2']};
            border-right: 1px solid ${palette['background-basic-color-4']};
          }
          .sidebar nav {
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .sidebar nav a {
            padding: 4px 16px;
          }

          .section {
            font-size: 12px;
            padding: 4px 16px;
            padding-bottom: 0;
            color: ${palette['text-hint-color']};
            font-weight: bold;
          }
          .separator {
            height: 1px;
            margin: 8px 0;
            background: ${palette['background-basic-color-4']};
          }
        `}
      </style>
    </>
  )
}
