import { ApolloProvider } from '@apollo/client'
import { Theme, ThemeProvider } from '@app/ui'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { useContext } from 'react'
import { apolloClient } from './apollo'
import { SettingsScreen } from './screens/settings'

const WithTheme: React.FC = () => {
  const { palette } = useContext(Theme)

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={palette}>
        <ApolloProvider client={apolloClient}>
          <SettingsScreen />
        </ApolloProvider>
      </ApplicationProvider>
    </>
  )
}

/**
 * Application.
 */
export default function App () {
  return (
    <ThemeProvider>
      <WithTheme />
    </ThemeProvider>
  )
}
