import { Auth } from '@app/logic'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Text } from '@ui-kitten/components'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { GhostButton } from '~/components/button'
import { Layout } from '~/components/layout'
import { MainNavParams } from '~/navigation'

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  signout: {
    margin: 32
  }
})

type Props = BottomTabScreenProps<MainNavParams, 'Profile'>

/**
 * Profile screen.
 * @param props Props.
 */
export const ProfileScreen: React.FC<Props> = () => {
  const { user, signout, signoutError, loading } = useContext(Auth)

  return (
    <Layout title='Profile' style={styles.layout}>
      <Text>ProfileScreen</Text>
      {loading && <Text>loading</Text>}
      {signoutError && <Text>{signoutError.messages.join('. ')}</Text>}
      {user && (
        <GhostButton style={styles.signout} onPress={signout}>
          Signout
        </GhostButton>
      )}
    </Layout>
  )
}
