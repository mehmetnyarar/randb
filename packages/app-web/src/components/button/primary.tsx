import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Primary button.
 * @param props Props.
 */
export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      backColor='color-primary-600'
      backHoverColor='color-primary-700'
    >
      {children}
    </Button>
  )
}
