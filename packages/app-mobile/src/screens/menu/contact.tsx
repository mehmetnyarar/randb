import { DrawerScreenProps } from '@react-navigation/drawer'
import { Text } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '~/components/layout'
import { MenuNavParams } from '~/navigation'

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = DrawerScreenProps<MenuNavParams, 'Contact'>

/**
 * Contact screen.
 * @param props Props.
 */
export const ContactScreen: React.FC<Props> = () => {
  return (
    <Layout title='Contact' allowBack style={styles.layout}>
      <Text>ContactScreen</Text>
    </Layout>
  )
}
