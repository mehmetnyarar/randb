import { Theme } from '@app/ui'
import React, { HTMLProps, useContext } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {}

/**
 * Edit button.
 * @param props Props.
 */
export const EditButton: React.FC<Props> = ({ children, ...props }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <button
        {...props}
        type='button'
        className='edit'
        data-testid='edit-button'
      >
        {children}
      </button>
      <style jsx>
        {`
          .edit {
            outline: none;
            min-width: 100px;
            margin-left: 16px;
            padding: 8px 0;
            border-radius: 4px;
            border: none;
            color: ${palette['text-control-color']};
            background: ${palette['text-info-color']};
            transition: background 0.25s;
          }
          .edit:hover {
            cursor: pointer;
            background: ${palette['color-info-900']};
          }
          .edit:disabled {
            color: ${palette['text-disabled-color']};
            background-color: ${palette['color-basic-disabled']};
            border: 1px solid ${palette['color-basic-disabled']};
          }
        `}
      </style>
    </>
  )
}
