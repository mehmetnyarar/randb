import { useCallback, useState } from 'react'
import { SnackContext, SnackMessage, SnackOptions } from './types'

/**
 * Creates a snack context.
 * @param options Options.
 */
export const useSnack = (options: SnackOptions = {}): SnackContext => {
  const { autoCloseAfter } = options

  const [message, setMessage] = useState<SnackMessage>()
  const hide = useCallback(() => setMessage(undefined), [])
  const show = useCallback(
    (msg: SnackMessage, opts: SnackOptions = {}) => {
      setMessage(msg)

      const closeAfter = autoCloseAfter || opts.autoCloseAfter
      if (closeAfter) {
        setTimeout(hide, closeAfter)
      }
    },
    [autoCloseAfter, hide]
  )

  return {
    message,
    show,
    hide
  }
}
