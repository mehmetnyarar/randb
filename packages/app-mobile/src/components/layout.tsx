import {
  Divider,
  Layout as UILayout,
  TopNavigation
} from '@ui-kitten/components'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleProp, StyleSheet, ViewProps } from 'react-native'
import { ChevronLeftIcon, MenuIcon } from '~/icons'

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
})

interface Props {
  title?: string
  style?: StyleProp<ViewProps>
  showGoBack?: boolean
  showDrawerMenu?: boolean
}

/**
 * Screen layout.
 * @param props Props.
 */
export const Layout: React.FC<Props> = ({
  title,
  style,
  showGoBack,
  showDrawerMenu,
  children
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {title && (
        <>
          <TopNavigation
            title={title || 'TITLE IS REQUIRED'}
            alignment='center'
            accessoryLeft={showGoBack ? ChevronLeftIcon : undefined}
            accessoryRight={showDrawerMenu ? MenuIcon : undefined}
            accessibilityLabel='Top Navigation'
          />
          <Divider />
        </>
      )}
      <UILayout style={[styles.layout, style]}>{children}</UILayout>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}
