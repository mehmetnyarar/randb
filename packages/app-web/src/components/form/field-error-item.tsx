import { getFieldError } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from '~/i18n'

interface Props {
  error?: any
}

/**
 * Field error.
 * @param props Props.
 */
export const FieldErrorItem: React.FC<Props> = ({ error }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  const message = useMemo(() => {
    const e = getFieldError(error)

    if (e) {
      const { message: m, path: p, value } = e
      return t(m, { value, path: p && t(p) })
    }

    return undefined
  }, [t, error])

  if (!message) return null

  return (
    <>
      <li className='field-error-item' data-testid='field-error-item'>
        {message}
      </li>
      <style jsx>
        {`
          .field-error-item {
            font-size: 12px;
            color: ${palette['text-danger-color']};
          }
        `}
      </style>
    </>
  )
}
