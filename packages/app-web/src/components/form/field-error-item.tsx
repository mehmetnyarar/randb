import { Theme } from '@app/ui'
import React, { useContext, useMemo } from 'react'

interface Props {
  error?: any
}

/**
 * Field error.
 * @param props Props.
 */
export const FieldErrorItem: React.FC<Props> = ({ error }) => {
  const { palette } = useContext(Theme)
  const message = useMemo(() => {
    if (!error) return null
    if (typeof error === 'string') return error
    if (error.message) return error.message
    return null
  }, [error])

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
