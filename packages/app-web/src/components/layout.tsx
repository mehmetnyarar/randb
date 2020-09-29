import { Auth, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import { Error } from '~/components/error'
import { useTranslation } from '~/i18n'
import { AppLink } from '~/types'
import { LanguageSelection } from './language'
import { Sidebar } from './sidebar'
import { ThemeSelection } from './theme'

// TODO Create the following pages
const footerLinks: AppLink[] = [
  { path: '/about', title: 'about' },
  { path: '/contact', title: 'contact' }
]

interface Props {
  /**
   * Page title.
   */
  title: string

  /**
   * Users who can view this screen.
   */
  roles?: UserRole[]
}

/**
 * Layout.
 * @param props Props.
 */
export const Layout: React.FC<Props> = ({ title, roles, children }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)
  const { initializing, user, loading, signout } = useContext(Auth)
  const isAuthorized = useMemo(() => {
    return !roles || (user && roles.some(role => user.roles.includes(role)))
  }, [user, roles])

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <title>{`${t(title)} - ${t('app.name')}`}</title>
      </Head>

      <header role='banner'>
        <h2>
          <Link href='/'>
            <a>{t('app.name')}</a>
          </Link>
        </h2>
        <div className='user' data-testid='user'>
          {initializing ? (
            <span>...</span>
          ) : user ? (
            <>
              <span>{t('welcome.user', { name: user.name.first })}</span>
              <button
                type='button'
                onClick={() => signout()}
                disabled={loading}
                className='signout'
                data-testid='signout'
              >
                {t('auth.signout')}
              </button>
            </>
          ) : (
            <Link href='/signin'>
              <a>{t('auth.signin')}</a>
            </Link>
          )}
        </div>
      </header>

      {user ? (
        <div className='with-sidebar'>
          <Sidebar />
          {isAuthorized ? children : <Error statusCode={401} />}
        </div>
      ) : isAuthorized ? (
        children
      ) : (
        <Error statusCode={401} />
      )}

      <footer role='contentinfo'>
        <section>
          <div className='app-info'>
            <span className='name'>{t('app.name')}</span>
            <span className='copy'>{t('app.copy')}</span>
            <span className='version'>{t('app.version')}</span>
          </div>
          <ThemeSelection />
          <LanguageSelection />
        </section>
        <nav role='navigation' aria-label='Footer Navigation'>
          {footerLinks.map((link, index) => (
            <Link key={index} href={link.path}>
              <a title={link.description}>{t(`screen.${link.title}`)}</a>
            </Link>
          ))}
        </nav>
      </footer>

      <style jsx>
        {`
          header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 4px 16px;
            border-bottom: 1px solid ${palette['outline-color']};
            background: ${palette['background-basic-color-2']};
          }
          header h2 {
            font-variant: petite-caps;
          }

          .signout {
            cursor: pointer;
            margin-left: 16px;
            padding: 16px;
            outline: none;
            border: none;
            border-radius: 4px;
            background: ${palette['background-alternative-color-1']};
            color: ${palette['text-alternate-color']};
            transition: background 0.5s ease;
          }
          .signout:hover {
            background: ${palette['background-alternative-color-4']};
          }

          .with-sidebar {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }

          footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 16px;
            border-top: 1px solid ${palette['outline-color']};
            background: ${palette['background-basic-color-2']};
          }
          footer section {
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

          footer nav {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
          }
        `}
      </style>

      <style jsx global>
        {`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          body {
            display: flex;
            min-height: 100vh;
            background: ${palette['background-basic-color-1']};
            color: ${palette['text-basic-color']};
          }

          #__next {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          a {
            text-decoration: none;
            color: ${palette['color-primary-default']};
          }
          a:hover {
            color: ${palette['color-primary-hover']};
          }
        `}
      </style>
    </>
  )
}
