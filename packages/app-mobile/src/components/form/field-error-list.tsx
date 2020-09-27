import { TextProps } from '@ui-kitten/components'
import { isPlainObject } from 'lodash'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { FieldErrorItem } from './field-error-item'

const styles = StyleSheet.create({
  errors: {}
})

interface Props extends TextProps {
  errors?: any
}

/**
 * Field errors.
 * @param props Props.
 */
export const FieldErrorList: React.FC<Props> = ({ errors, ...props }) => {
  const list = useMemo(
    () =>
      errors
        ? Array.isArray(errors)
          ? errors
          : isPlainObject(errors)
            ? Object.values(errors)
            : undefined
        : undefined,
    [errors]
  )

  if (!list || !list.length) return null

  return (
    <View style={styles.errors}>
      {list.map((error, i) => (
        <FieldErrorItem key={i} error={error} {...props} />
      ))}
    </View>
  )
}
