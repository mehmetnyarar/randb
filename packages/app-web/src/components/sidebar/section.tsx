import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { Divider } from '../divider'

interface Props {
  flex?: number
  title: string
  hasDivider?: boolean
  overflow?: boolean
}

/**
 * Sidebar section.
 */
export const Section: React.FC<Props> = ({
  flex,
  overflow,
  title,
  hasDivider,
  children
}) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <section className='sidebar-section'>
        <h3>{title}</h3>
        {children}
        {hasDivider && <Divider />}
      </section>

      <style jsx>
        {`
          .sidebar-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex: ${flex || 'unset'};
            overflow-y: ${overflow ? 'hidden' : 'unset'};
          }
          .sidebar-section h3 {
            margin: 16px 0 8px;
            font-weight: bold;
            font-size: 12px;
            color: ${palette['text-hint-color']};
          }
        `}
      </style>
    </>
  )
}
