import { getErrorMessage, getGraphQLError, useWelcomeQuery } from '@app/logic'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Text } from '@ui-kitten/components'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '~/components/layout'
import { MainNavParams } from '~/navigation'

const styles = StyleSheet.create({
  layout: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = BottomTabScreenProps<MainNavParams, 'Home'>

/**
 * Home screen.
 * @param props Props.
 */
export const HomeScreen: React.FC<Props> = () => {
  const { data, error, loading } = useWelcomeQuery()
  const errorMessage = useMemo(() => {
    return error ? getErrorMessage(getGraphQLError(error)) : undefined
  }, [error])

  return (
    <Layout title='Home' style={styles.layout}>
      <Text>Welcome to the mobile application!</Text>
      {data && <Text>{data.welcome}</Text>}
      {loading && <Text>Loading</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}
    </Layout>
  )
}
