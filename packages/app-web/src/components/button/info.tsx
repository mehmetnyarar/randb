import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Info button.
 * @param props Props.
 */
export const InfoButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      backColor='color-info-600'
      backHoverColor='color-info-700'
    >
      {children}
    </Button>
  )
}
