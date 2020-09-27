import { Button, ButtonProps } from '@ui-kitten/components'
import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    marginVertical: 8
  }
})

interface Props extends ButtonProps {}

/**
 * Submit button.
 * @param Props Props.
 */
export const SubmitButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Button status='primary' style={styles.button} {...props}>
      {children}
    </Button>
  )
}
