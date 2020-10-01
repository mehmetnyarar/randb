import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Submit button.
 * @param props Props.
 */
export const SubmitButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      type='submit'
      margin='16px 0 0 0'
      backColor='color-primary-600'
      backHoverColor='color-primary-700'
      data-testid='submit'
    >
      {children}
    </Button>
  )
}
