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
  { path: '/contact', title: 'contact' },
  { path: '/policy', title: 'policy' }
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
          <div className='app-settings'>
            <ThemeSelection />
            <LanguageSelection />
          </div>
          <div className='app-info'>
            <span className='name'>{t('app.name')}</span>
            <span className='version'>{t('app.version')}</span>
            <span className='copy'>{t('app.copy')}</span>
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
            padding: 16px;
            border-top: 1px solid ${palette['border-basic-color-3']};
            background: ${palette['background-basic-color-2']};
            font-size: smaller;
            display: flex;
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: stretch;
          }

          .app-footer section {
            display: block;
          }

          .app-info {
            margin-top: 8px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
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
            justify-content: center;
            align-items: center;
          }
          .app-settings div:first-of-type {
            margin-right: 32px;
          }

          footer nav {
            margin-bottom: 8px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          footer nav a {
            margin: 0 8px;
          }

          @media screen and (min-width: 600px) {
            .app-footer {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-end;
            }
            .app-settings {
              justify-content: flex-start;
            }

            footer nav {
              margin: 0;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-end;
            }
            footer nav a {
              margin: 0;
            }
          }
        `}
      </style>
    </>
  )
}
