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
      <Text testID='welcome'>
        Open up App.tsx to start working on your app!
      </Text>
      {loading && <Text testID='api-loading'>...</Text>}
      {apiError && <Text testID='api-error'>{apiError}</Text>}
      {data && <Text testID='api-welcome'>{data.welcome}</Text>}
    </View>
  )
}
