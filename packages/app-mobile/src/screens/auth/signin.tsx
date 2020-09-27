import { Auth } from '@app/logic'
import { StackScreenProps } from '@react-navigation/stack'
import { Text } from '@ui-kitten/components'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { GhostButton } from '~/components/button'
import { Layout } from '~/components/layout'
import { AuthNavParams } from '~/navigation/types'

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skip: {
    margin: 32
  }
})

type Props = StackScreenProps<AuthNavParams, 'Signin'>

/**
 * Signin screen.
 */
export const SigninScreen: React.FC<Props> = () => {
  const { onSkipChange } = useContext(Auth)

  return (
    <Layout allowBack allowMenu={false} style={styles.layout}>
      <Text>This is SigninScreen</Text>

      <GhostButton style={styles.skip} onPress={() => onSkipChange(true)}>
        Skip signin
      </GhostButton>
    </Layout>
  )
}
