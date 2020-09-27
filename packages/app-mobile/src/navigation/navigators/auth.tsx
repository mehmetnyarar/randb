import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SigninScreen } from '~/screens/auth'
import { AuthNavParams } from '../types'

const Auth = createStackNavigator<AuthNavParams>()

export const AuthNavigator: React.FC = () => {
  return (
    <Auth.Navigator headerMode='none'>
      <Auth.Screen name='Signin' component={SigninScreen} />
    </Auth.Navigator>
  )
}
