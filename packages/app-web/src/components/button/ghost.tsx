import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Ghost button.
 * @param props Props.
 */
export const GhostButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      ghost
      padding='0px'
      textColor='text-hint-color'
      data-testid='ghost'
    >
      {children}
    </Button>
  )
}
