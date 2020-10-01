import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Danger button.
 * @param props Props.
 */
export const DangerButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      backColor='color-danger-600'
      backHoverColor='color-danger-700'
    >
      {children}
    </Button>
  )
}
