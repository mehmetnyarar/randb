import { Theme } from '@app/ui'
import React, { HTMLProps, useContext } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {}

/**
 * Submit button.
 * @param props Props.
 */
export const SubmitButton: React.FC<Props> = ({ children, ...props }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <button
        {...props}
        type='submit'
        className='submit'
        data-testid='submit-button'
      >
        {children}
      </button>
      <style jsx>
        {`
          .submit {
            height: 40px;
            padding: 8px;
            margin-top: 16px;
            color: ${palette['text-control-color']};
            background-color: ${palette['border-primary-color-1']};
            border: 1px solid ${palette['border-primary-color-1']};
            border-radius: 4px;
            outline: none;
          }
          .submit:hover {
            cursor: pointer;
            border: 1px solid ${palette['color-primary-hover-border']};
          }
          .submit:disabled {
            color: ${palette['text-disabled-color']};
            background-color: ${palette['color-basic-disabled']};
            border: 1px solid ${palette['color-basic-disabled']};
          }
        `}
      </style>
    </>
  )
}
