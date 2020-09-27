import { Text, TextProps } from '@ui-kitten/components'
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 12
  }
})

interface Props extends TextProps {
  error?: any
}

/**
 * Field error.
 * @param props Props.
 */
export const FieldError: React.FC<Props> = ({ error, ...props }) => {
  const message = useMemo(() => {
    if (!error) return null
    if (typeof error === 'string') return error
    if (error.message) return error.message
    return null
  }, [error])

  if (!message) return null

  return (
    <Text category='p1' status='danger' style={styles.text} {...props}>
      {message}
    </Text>
  )
}
