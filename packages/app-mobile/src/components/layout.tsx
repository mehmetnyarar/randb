import { Theme } from '@app/ui'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import {
  Layout as LayoutView,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native'
import { ChevronLeftIcon, MenuIcon } from '~/icons'

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 16,
    alignItems: 'stretch'
  }
})

interface Props extends ViewProps {
  title?: string
  isAuthScreen?: boolean
  allowBack?: boolean
  allowMenu?: boolean
}

/**
 * Screen layout.
 * @param props Props.
 */
export const Layout: React.FC<Props> = ({
  title,
  allowBack = false,
  allowMenu = true,
  children,
  style,
  ...viewProps
}) => {
  const { scheme } = useContext(Theme)
  const { dispatch, goBack } = useNavigation()

  const GoBack: RenderProp<{}> | undefined =
    title && allowBack
      ? () => (
        <TopNavigationAction
          icon={ChevronLeftIcon}
          onPress={goBack}
          accessibilityLabel='Go Back'
        />
      )
      : undefined

  const ToggleMenu: RenderProp<{}> | undefined =
    title && allowMenu
      ? () => (
        <TopNavigationAction
          icon={MenuIcon}
          onPress={() => dispatch(DrawerActions.toggleDrawer)}
          accessibilityLabel='Toggle Menu'
        />
      )
      : undefined

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {title && (
        <TopNavigation
          title={title}
          alignment='center'
          accessoryLeft={GoBack}
          accessoryRight={ToggleMenu}
          accessibilityLabel='Top Navigation'
        />
      )}
      <LayoutView level='1' style={[styles.layout, style]} {...viewProps}>
        {children}
      </LayoutView>
      <StatusBar style={scheme} />
    </SafeAreaView>
  )
}
