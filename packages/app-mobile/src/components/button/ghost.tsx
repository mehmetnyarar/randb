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
 * Ghost button.
 * @param props Props.
 */
export const GhostButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Button
      size='small'
      status='basic'
      appearance='ghost'
      style={styles.button}
      {...props}
    >
      {children}
    </Button>
  )
}
