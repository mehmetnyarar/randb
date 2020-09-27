import { ApolloProvider } from '@apollo/client'
import { Auth, AuthProvider, RequestOrigin, SnackProvider } from '@app/logic'
import { Theme, ThemeProvider } from '@app/ui'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { useContext } from 'react'
import { apolloClient } from './apollo'
import { SnackBar } from './components/snackbar'
import { AppNavigator } from './navigation'

export const WithAuth: React.FC = () => {
  const { skip, user } = useContext(Auth)

  return <AppNavigator auth={!(user || skip)} />
}

export const WithTheme: React.FC = () => {
  const { palette } = useContext(Theme)

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={palette}>
        <SnackProvider>
          <ApolloProvider client={apolloClient}>
            <AuthProvider origin={RequestOrigin.MOBILE}>
              <WithAuth />
            </AuthProvider>
          </ApolloProvider>
          <SnackBar />
        </SnackProvider>
      </ApplicationProvider>
    </>
  )
}

/**
 * Application.
 */
export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WithTheme />
    </ThemeProvider>
  )
}

export default App
