import { isUserAuthorized, UserRole } from '@app/logic'
import Link from 'next/link'
import React from 'react'
import { push as Menu } from 'react-burger-menu'
import { useTranslation } from '~/i18n'
import { useMenu } from '~/state'
import { AppLink } from '~/types'
import { TopologyView } from '../network'
import { SidebarSection as Section } from './sidebar-section'

// itemListElement does not exist in the TS definitions
// https://github.com/negomi/react-burger-menu/issues/429
const SidebarMenu = Menu as any

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
  const { isOpen, toggle } = useMenu()

  return (
    <>
      <SidebarMenu
        id='sidebar'
        width={300}
        // noOverlay
        disableAutoFocus
        itemListElement='div'
        isOpen={isOpen}
        onOpen={toggle}
        onClose={toggle}
        outerContainerId='__next'
        pageWrapId='main'
        className='sidebar'
      >
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
      </SidebarMenu>

      <style jsx>
        {`
          .sidebar nav {
            margin-top: 32px;
          }
          a {
            margin-bottom: 8px;
          }
        `}
      </style>
    </>
  )
}
