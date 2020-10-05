import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { Divider } from '../divider'

interface Props {
  flex?: number
  title: string
  divider?: boolean
}

/**
 * Sidebar section.
 */
export const SidebarSection: React.FC<Props> = ({
  flex,
  title,
  divider,
  children
}) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <section className='sidebar-section'>
        <h3>{title}</h3>
        {children}
        {divider && <Divider />}
      </section>

      <style jsx>
        {`
          .sidebar-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            flex: ${flex || 'unset'};
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
