import { DrawerScreenProps } from '@react-navigation/drawer'
import { ListItem } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '~/components/layout'
import { ThemeSelection } from '~/components/theme'
import { MenuNavParams } from '~/navigation'

const styles = StyleSheet.create({
  layout: {}
})

type Props = DrawerScreenProps<MenuNavParams, 'Settings'>

/**
 * Settings screen.
 * @param props Props.
 */
export const SettingsScreen: React.FC<Props> = () => {
  return (
    <Layout title='Settings' allowBack style={styles.layout}>
      <ListItem title='Theme' accessoryRight={() => <ThemeSelection />} />
    </Layout>
  )
}
