import { Snack } from '@app/logic'
import { Theme } from '@app/ui'
import { Card, Modal, Text } from '@ui-kitten/components'
import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { GhostButton } from '../button'
import { getColor } from './utility'

const styles = StyleSheet.create({
  modal: {
    width: 300
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  card: {
    borderWidth: 0,
    borderRadius: 4
  },
  header: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {},
  content: {}
})

interface Props {}

/**
 * Snack bar.
 */
export const SnackBar: React.FC<Props> = () => {
  const { hide, message } = useContext(Snack)
  const { palette } = useContext(Theme)

  if (!message) return null

  const { type, title, content } = message
  const status = type === 'error' ? 'danger' : type

  const color = getColor(palette, type)
  const themedStyles = StyleSheet.create({
    close: {
      borderWidth: 1,
      borderColor: color,
      borderRadius: 4
    }
  })

  return (
    <Modal
      style={styles.modal}
      visible
      backdropStyle={styles.backdrop}
      onBackdropPress={hide}
      accessibilityLabel='Snackbar'
    >
      <Card
        disabled
        status={status}
        style={styles.card}
        header={headerProps => (
          <View {...headerProps} style={styles.header}>
            <Text category='h4' status={status} style={styles.title}>
              {title || type}
            </Text>
            <GhostButton
              size='small'
              status={status}
              style={themedStyles.close}
              onPress={hide}
              accessibilityLabel='Close snackbar'
            >
              X
            </GhostButton>
          </View>
        )}
      >
        <View style={styles.content}>
          {typeof content === 'string' ? (
            <Text category='p1'>{content}</Text>
          ) : (
            content
          )}
        </View>
      </Card>
    </Modal>
  )
}
