import { Auth, isUserAuthorized, UserRole } from '@app/logic'
import Head from 'next/head'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from '~/i18n'
import { Error } from '../error'
import { Loading } from '../loading'
import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'
import { GlobalStyles } from './styles'

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
  const { initializing, user } = useContext(Auth)
  const isAuthorized = useMemo(() => isUserAuthorized(roles, user?.roles), [
    roles,
    user
  ])

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <title>{`${t(title)} - ${t('app.name')}`}</title>
      </Head>

      <Header />
      {initializing ? (
        <main role='main' className='app-loading'>
          <Loading icon spin text={t('loading')} />
        </main>
      ) : (
        <Content roles={user?.roles}>
          {isAuthorized ? children : <Error statusCode={401} />}
        </Content>
      )}

      <Footer />

      <style jsx>
        {`
          .app-loading {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <GlobalStyles />
    </>
  )
}
