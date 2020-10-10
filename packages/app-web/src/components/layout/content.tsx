import { UserRole } from '@app/logic'
import React from 'react'
import { Sidebar } from './sidebar'

interface Props {
  roles?: UserRole[]
}

/**
 * App content.
 * @param props Props.
 */
export const Content: React.FC<Props> = ({ roles, children }) => {
  if (roles) {
    return (
      <>
        <div className='app-content with-sidebar'>
          <Sidebar roles={roles} />
          {children}
        </div>

        <style jsx>
          {`
            .app-content.with-sidebar {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: flex-start;
              padding-top: 75px;
              padding-bottom: 100px;
            }
          `}
        </style>
      </>
    )
  }

  return <>{children}</>
}
