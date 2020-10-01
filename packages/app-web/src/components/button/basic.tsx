import React from 'react'
import { Button, ButtonProps } from './button'

/**
 * Basic button.
 * @param props Props.
 */
export const BasicButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>
}
