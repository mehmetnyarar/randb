import React, { forwardRef, HTMLProps } from 'react'
import { ButtonProps } from './button'

interface AnchorLinkProps extends HTMLProps<HTMLAnchorElement> {}
export const AnchorLink = forwardRef((props: AnchorLinkProps, ref: any) => {
  const { href, onClick, children } = props
  return (
    <a ref={ref} href={href.toString()} onClick={onClick}>
      {children}
    </a>
  )
})
AnchorLink.displayName = 'AnchorLink'

interface ButtonLinkProps extends ButtonProps {}
export const ButtonLink = forwardRef((props: ButtonLinkProps, ref: any) => {
  const { onClick, children } = props
  return (
    <button ref={ref} onClick={onClick}>
      {children}
    </button>
  )
})
ButtonLink.displayName = 'ButtonLink'
