import { Text, TextProps } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    marginBottom: 8
  }
})

interface Props extends TextProps {}

/**
 * Form label.
 * @param props Props.
 */
export const Label: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Text category='label' appearance='hint' style={styles.text} {...props}>
      {children}
    </Text>
  )
}
