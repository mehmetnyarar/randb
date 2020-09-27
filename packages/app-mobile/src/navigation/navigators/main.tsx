import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import React from 'react'
import { HomeIcon, PersonIcon } from '~/icons'
import { HomeScreen, ProfileScreen } from '~/screens/main'
import { MainNavParams } from '../types'

type TabBarProps = BottomTabBarProps<BottomTabBarOptions>
const TabBar: React.FC<TabBarProps> = ({ navigation, state }) => {
  const { index, routeNames } = state
  const { navigate } = navigation

  return (
    <BottomNavigation
      selectedIndex={index}
      onSelect={index => navigate(routeNames[index])}
      style={{ paddingVertical: 16 }}
    >
      <BottomNavigationTab title='Home' icon={HomeIcon} />
      <BottomNavigationTab title='Profile' icon={PersonIcon} />
    </BottomNavigation>
  )
}

const Main = createBottomTabNavigator<MainNavParams>()

export const MainNavigator: React.FC = () => {
  return (
    <Main.Navigator tabBar={props => <TabBar {...props} />}>
      <Main.Screen name='Home' component={HomeScreen} />
      <Main.Screen name='Profile' component={ProfileScreen} />
    </Main.Navigator>
  )
}
