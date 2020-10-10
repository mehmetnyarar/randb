import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useTranslation } from '~/i18n'
import { AppLink } from '~/types'
import { LanguageSelection } from '../language'
import { ThemeSelection } from '../theme'

// TODO Create the following pages
const links: AppLink[] = [
  { path: '/about', title: 'about' },
  { path: '/contact', title: 'contact' }
]

interface Props {}

/**
 * App footer.
 */
export const Footer: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  return (
    <>
      <footer role='contentinfo' className='app-footer'>
        <section>
          <div className='app-info'>
            <span className='name'>{t('app.name')}</span>
            <span className='version'>{t('app.version')}</span>
            <span className='copy'>{t('app.copy')}</span>
          </div>
          <div className='app-settings'>
            <LanguageSelection />
            <ThemeSelection />
          </div>
        </section>
        <nav role='navigation' aria-label='Footer Navigation'>
          {links.map((link, index) => (
            <Link key={index} href={link.path}>
              <a title={link.description}>{t(`screen.${link.title}`)}</a>
            </Link>
          ))}
        </nav>
      </footer>

      <style jsx>
        {`
          .app-footer {
            min-height: 100px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 16px;
            border-top: 1px solid ${palette['border-basic-color-3']};
            background: ${palette['background-basic-color-2']};
            font-size: smaller;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .app-footer section {
            display: block;
          }

          .app-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .app-info span {
            margin-right: 4px;
          }
          .app-info .version {
            font-size: 8px;
            font-style: italic;
          }

          .app-settings {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .app-settings div:first-of-type {
            margin-right: 16px;
          }

          footer nav {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
          }
        `}
      </style>
    </>
  )
}
