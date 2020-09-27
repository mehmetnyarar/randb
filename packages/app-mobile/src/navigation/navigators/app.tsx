import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { linking } from '../linking'
import { AuthNavigator } from './auth'
import { MenuNavigator } from './menu'

export interface AppNavigatorProps {
  /**
   * Authenticate user?
   */
  auth?: boolean
}

/**
 * Applicatication navigator.
 * @param props Props.
 */
export const AppNavigator: React.FC<AppNavigatorProps> = ({ auth }) => {
  return (
    <NavigationContainer linking={linking}>
      {auth ? <AuthNavigator /> : <MenuNavigator />}
    </NavigationContainer>
  )
}
