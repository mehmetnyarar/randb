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

type Props = DrawerScreenProps<MenuNavParams, 'About'>

/**
 * About screen.
 * @param props Props.
 */
export const AboutScreen: React.FC<Props> = () => {
  return (
    <Layout title='About' allowBack style={styles.layout}>
      <Text>AboutScreen</Text>
    </Layout>
  )
}
