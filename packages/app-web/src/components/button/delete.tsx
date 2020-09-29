import { Theme } from '@app/ui'
import React, { HTMLProps, useContext } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {}

/**
 * Delete button.
 * @param props Props.
 */
export const DeleteButton: React.FC<Props> = ({ children, ...props }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <button
        {...props}
        type='button'
        className='delete'
        data-testid='delete-button'
      >
        {children}
      </button>
      <style jsx>
        {`
          .delete {
            outline: none;
            min-width: 100px;
            margin-left: 16px;
            padding: 8px 0;
            border-radius: 4px;
            border: none;
            color: ${palette['text-control-color']};
            background: ${palette['text-danger-color']};
            transition: background 0.25s;
          }
          .delete:hover {
            cursor: pointer;
            background: ${palette['color-danger-900']};
          }
          .delete:disabled {
            color: ${palette['text-disabled-color']};
            background-color: ${palette['color-basic-disabled']};
            border: 1px solid ${palette['color-basic-disabled']};
          }
        `}
      </style>
    </>
  )
}
