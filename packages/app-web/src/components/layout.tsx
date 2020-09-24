import { Auth } from '@app/logic'
import { ColorScheme, Theme } from '@app/ui'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { APP_COPY, APP_NAME, APP_VERSION } from '~/config'
import { AppLink } from '~/types'

// TODO Create the following pages
const footerLinks: AppLink[] = [
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
  { path: '/faq', title: 'FAQ' }
]

interface Props {
  /**
   * Page title.
   */
  title: string
}

/**
 * Layout.
 * @param props Props.
 */
export const Layout: React.FC<Props> = ({ title, children }) => {
  const { scheme, palette, onSchemeChange } = useContext(Theme)
  const { initializing, user, loading, signout } = useContext(Auth)

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <title>{`${title} - ${APP_NAME}`}</title>
      </Head>

      <header role='banner'>
        <h2>{APP_NAME}</h2>
        <div className='user' data-testid='user'>
          {initializing ? (
            <span>...</span>
          ) : user ? (
            <>
              <span>Hello {user.name.first}</span>
              <button
                type='button'
                onClick={() => signout()}
                disabled={loading}
                className='signout'
                data-testid='signout'
              >
                Signout
              </button>
            </>
          ) : (
            <Link href='/signin'>
              <a>Signin</a>
            </Link>
          )}
        </div>
      </header>

      {children}

      <footer role='contentinfo'>
        <section>
          <div className='app-info'>
            <span className='name'>{APP_NAME}</span>
            <span className='copy'>©{APP_COPY}</span>
            <span className='version'>v{APP_VERSION}</span>
          </div>
          <div className='app-theme'>
            <label htmlFor='theme'>Theme</label>
            <select
              id='theme'
              value={scheme}
              onChange={e => onSchemeChange(e.target.value as ColorScheme)}
              data-testid='theme'
            >
              {['light', 'dark'].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>
        <nav role='navigation'>
          {footerLinks.map((link, index) => (
            <Link key={index} href={link.path}>
              <a title={link.description}>{link.title}</a>
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

          footer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
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

          .app-theme {
            margin-top: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .app-theme label {
            margin-right: 8px;
          }
          .app-theme select {
            padding: 0 8px;
            background: transparent:
            color: ${palette['background-basic-color-2']};
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
