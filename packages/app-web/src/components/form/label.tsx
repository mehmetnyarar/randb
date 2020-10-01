import React, { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLLabelElement> {}

/**
 * Form label.
 * @param props Props.
 */
export const Label: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <label {...props} data-testid='label'>
        {children}
      </label>
    </>
  )
}
