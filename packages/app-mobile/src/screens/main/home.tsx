import { getErrorMessage, getGraphQLError, useWelcomeQuery } from '@app/logic'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

interface Props {}

export const HomeScreen: React.FC<Props> = () => {
  const { data, error, loading } = useWelcomeQuery()
  const apiError = useMemo(
    () => error && getErrorMessage(getGraphQLError(error)),
    [error]
  )

  return (
    <View style={styles.container}>
      <Text>Welcome to the mobile application!</Text>
      {loading && <Text>Loading</Text>}
      {apiError && <Text>{apiError}</Text>}
      {data && <Text>{data.welcome}</Text>}
    </View>
  )
}
