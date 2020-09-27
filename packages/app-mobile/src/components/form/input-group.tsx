import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

interface Props {}

/**
 * Input group.
 * @param props Props.
 */
export const InputGroup: React.FC<Props> = ({ children }) => {
  return <View style={styles.inputGroup}>{children}</View>
}
