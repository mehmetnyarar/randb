import { initializeApolloClient } from '@app/logic'
import React from 'react'
import { Error } from '~/components/error'
import { Layout, Main } from '~/components/layout'
import { NextScreen } from '~/types'

interface Props {
  statusCode: number
}

/**
 * Error screen.
 * @param props Props.
 */
export const ErrorScreen: NextScreen<Props> = ({ t, statusCode }) => {
  return (
    <Layout title={t('screen.error')}>
      <Main justify='center' align='center'>
        <Error statusCode={statusCode} />
      </Main>
    </Layout>
  )
}

ErrorScreen.getInitialProps = async ({ res, err }) => {
  const apolloClient = initializeApolloClient()
  const statusCode = res ? res.statusCode : err ? err.statusCode : 0

  return {
    statusCode,
    namespacesRequired: ['common'],
    initialApolloState: apolloClient.cache.extract()
  }
}

export default ErrorScreen
