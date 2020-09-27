import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions
} from '@react-navigation/drawer'
import {
  Drawer as DrawerView,
  DrawerItem,
  IndexPath
} from '@ui-kitten/components'
import React from 'react'
import { AboutScreen, ContactScreen, SettingsScreen } from '~/screens/menu'
import { MenuNavParams } from '../types'
import { MainNavigator } from './main'

type DrawerContentProps = DrawerContentComponentProps<DrawerContentOptions>
const DrawerContent: React.FC<DrawerContentProps> = ({ navigation, state }) => {
  const { index, routeNames } = state
  const { navigate } = navigation

  return (
    <DrawerView
      selectedIndex={new IndexPath(index)}
      onSelect={index => navigate(routeNames[index.row])}
      style={{ paddingTop: 16 }}
    >
      <DrawerItem title='Main' />
      <DrawerItem title='About' />
      <DrawerItem title='Contact' />
      <DrawerItem title='Settings' />
    </DrawerView>
  )
}

const Menu = createDrawerNavigator<MenuNavParams>()

export const MenuNavigator: React.FC = () => {
  return (
    <Menu.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{ paddingTop: 20 }}
    >
      <Menu.Screen name='Main' component={MainNavigator} />
      <Menu.Screen name='About' component={AboutScreen} />
      <Menu.Screen name='Contact' component={ContactScreen} />
      <Menu.Screen name='Settings' component={SettingsScreen} />
    </Menu.Navigator>
  )
}
