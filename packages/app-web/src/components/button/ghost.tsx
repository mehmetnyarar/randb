import { Theme } from '@app/ui'
import React, { HTMLProps, useContext } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {}

/**
 * Ghost button.
 * @param props Props.
 */
export const GhostButton: React.FC<Props> = ({ children, ...props }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <button
        {...props}
        type='button'
        className='ghost'
        data-testid='ghost-button'
      >
        {children}
      </button>
      <style jsx>
        {`
          .ghost {
            border: none;
            outline: none;
            background: none;
            color: ${palette['text-hint-color']};
            align-self: flex-end;
          }
          .ghost:hover {
            cursor: pointer;
          }
          .ghost:disabled {
            color: ${palette['text-disabled-color']};
            background-color: ${palette['color-basic-disabled']};
            border: 1px solid ${palette['color-basic-disabled']};
          }
        `}
      </style>
    </>
  )
}
