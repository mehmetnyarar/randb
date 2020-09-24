import React, { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLLabelElement> {}

/**
 * Form label.
 * @param props Props.
 */
export const Label: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <label {...props} className='label' data-testid='label'>
        {children}
      </label>
      <style jsx>
        {`
          .label {
            margin: 8px 0;
          }
        `}
      </style>
    </>
  )
}
