import { ColorPalette, Theme } from '@app/ui'
import React, { HTMLProps, useContext } from 'react'

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  height?: number | string
  width?: number | string
  minWidth?: number
  margin?: number | string
  padding?: number | string
  backColor?: keyof ColorPalette
  backHoverColor?: keyof ColorPalette
  textColor?: keyof ColorPalette
  ghost?: boolean
}

/**
 * Button.
 * @param props Props.
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  height = 32,
  width,
  minWidth = 32,
  margin,
  padding = 8,
  backColor = 'color-basic-500',
  backHoverColor = 'color-basic-600',
  textColor = 'text-control-color',
  ghost = false,
  children,
  ...props
}) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <button type={type} className='button' {...props}>
        {children}
      </button>
      <style jsx>
        {`
          .button {
            cursor: pointer;
            outline: none;
            height: ${height
              ? `${height}${typeof height === 'number' ? 'px' : '%'}`
              : 'unset'};
            width: ${width
              ? `${width}${typeof width === 'number' ? 'px' : '%'}`
              : 'unset'};
            min-width: ${minWidth}px;
            margin: ${margin
              ? `${margin}${typeof margin === 'number' ? 'px' : ''}`
              : 'unset'};
            padding: ${padding
              ? `${padding}${typeof padding === 'number' ? 'px' : ''}`
              : 'unset'};
            padding: 8px;
            border-radius: 4px;
            border: none;
            background: ${ghost ? 'transparent' : palette[backColor]};
            color: ${palette[textColor]};
            transition: background 0.25s;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .button:hover {
            background: ${ghost ? 'transparent' : palette[backHoverColor]};
          }
          .button:disabled {
            cursor: not-allowed;
            color: ${palette['text-disabled-color']};
            background-color: ${palette['color-basic-disabled']};
            border: 1px solid ${palette['color-basic-disabled']};
          }
        `}
      </style>
    </>
  )
}
