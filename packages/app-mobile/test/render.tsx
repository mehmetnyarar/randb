import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { Auth, AuthProvider, RequestOrigin } from '@app/logic'
import { ThemeProvider } from '@app/ui'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  render as rtlRender,
  RenderOptions
} from '@testing-library/react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React, { useContext } from 'react'
import { SigninScreen } from '~/screens/auth'
import { currentUser, welcome } from './mocks'

interface WrapperProps {
  auth?: boolean
  mocks?: MockedResponse[]
  screen?: React.FC
  children?: React.ReactElement
}

interface Options extends WrapperProps, RenderOptions {}

const WithTheme: React.FC<WrapperProps> = ({ mocks, children }) => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider origin={RequestOrigin.MOBILE}>{children}</AuthProvider>
      </MockedProvider>
    </ApplicationProvider>
  )
}

const render = (ui: React.ReactElement, options: Options = {}) => {
  const {
    mocks = [currentUser.isSignedIn, welcome.success],
    ...renderOptions
  } = options
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <ThemeProvider>
      <WithTheme mocks={mocks}>{children}</WithTheme>
    </ThemeProvider>
  )

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

const Stack = createStackNavigator()
const Navigator: React.FC<WrapperProps> = ({ auth, screen }) => {
  const { user, skip } = useContext(Auth)
  const showSignin = auth && !(user || skip)
  const Screen = screen as React.FC

  if (auth) console.warn('Navigator', { user, skip, showSignin })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSignin ? (
          <Stack.Screen name='Screen' component={SigninScreen} />
        ) : (
          <Stack.Screen name='Screen' component={Screen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const renderScreen = (ui: React.FC<any>, options: Options = {}) => {
  const {
    auth = false,
    mocks = [currentUser.isSignedIn, welcome.success],
    ...renderOptions
  } = options
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <ThemeProvider>
      <WithTheme mocks={mocks}>{children}</WithTheme>
    </ThemeProvider>
  )

  return {
    ...rtlRender(<Navigator auth={auth} screen={ui} />, {
      wrapper: Wrapper,
      ...renderOptions
    })
  }
}

export { render, renderScreen }
