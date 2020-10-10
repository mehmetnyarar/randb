import { Auth, initializeApolloClient } from '@app/logic'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { withTranslation } from '~/i18n'
import { NextScreen } from '~/types'

/**
 * Home screen.
 */
export const HomeScreen: NextScreen = () => {
  const { push } = useRouter()
  const { user } = useContext(Auth)

  // Redirect the user to the appropriate home page
  // based on the authentication status
  useEffect(() => {
    push(user ? '/dashboard' : '/welcome')
  }, [user, push])

  return null
}

/**
 * Initial props.
 */
HomeScreen.getInitialProps = async () => {
  const apolloClient = initializeApolloClient()

  return {
    initialApolloState: apolloClient.cache.extract(),
    namespacesRequired: ['common']
  }
}

export default withTranslation('common')(HomeScreen)
