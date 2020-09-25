import { ListItem } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '~/components/layout'
import { ThemeSelection } from '~/components/theme'

const styles = StyleSheet.create({
  layout: {}
})

interface Props {}

/**
 * Settings screen.
 */
export const SettingsScreen: React.FC<Props> = () => {
  return (
    <Layout title='Settings' style={styles.layout}>
      <ListItem title='Theme' accessoryRight={() => <ThemeSelection />} />
    </Layout>
  )
}
