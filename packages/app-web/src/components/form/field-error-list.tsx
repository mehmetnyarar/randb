import { isPlainObject } from 'lodash'
import React, { useMemo } from 'react'
import { FieldErrorItem } from './field-error-item'

interface Props {
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
    <>
      <ul className='field-error-list' data-testid='field-error-list'>
        {list.map((error, i) => (
          <FieldErrorItem key={i} error={error} {...props} />
        ))}
      </ul>
      <style jsx>
        {`
          margin: 8px 0 0 0;
          padding: 0;
          list-style: none;
        `}
      </style>
    </>
  )
}
