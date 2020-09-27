import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  field: {
    marginVertical: 8
  }
})

interface Props {}

/**
 * Form field.
 * @param props Props.
 */
export const Field: React.FC<Props> = ({ children }) => {
  return <View style={styles.field}>{children}</View>
}
