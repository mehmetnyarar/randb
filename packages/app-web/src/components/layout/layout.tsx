import { Auth, isUserAuthorized, Logger, UserRole } from '@app/logic'
import { Theme } from '@app/ui'
import Head from 'next/head'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from '~/i18n'
import { Error } from '../error'
import { Loading } from '../loading'
import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'
import { GlobalStyles } from './styles'

const logger = Logger.create({
  src: 'Layout'
})

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
  const { ready } = useContext(Theme)
  const { initializing, user } = useContext(Auth)

  const isReady = useMemo(() => ready && !initializing, [ready, initializing])
  const isAuthorized = useMemo(() => isUserAuthorized(roles, user?.roles), [
    roles,
    user
  ])

  logger.debug('Layout', {
    ready,
    initializing,
    user,
    isReady,
    isAuthorized
  })

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <title>{`${t(title)} - ${t('app.name')}`}</title>
      </Head>

      {isReady ? (
        <>
          <Header />
          <Content roles={user?.roles}>
            {isAuthorized ? (
              children
            ) : (
              <Main justify='center' align='center'>
                <Error statusCode={401} />
              </Main>
            )}
          </Content>
          <Footer />
        </>
      ) : (
        <Main justify='center' align='center'>
          <Loading icon spin text={t('loading')} />
        </Main>
      )}

      <GlobalStyles />
    </>
  )
}
