import { Theme } from '@app/ui'
import React, { useContext } from 'react'

/**
 * Divider.
 */
export const Divider: React.FC = () => {
  const { palette } = useContext(Theme)

  return (
    <>
      <div className='divider' />
      <style jsx>
        {`
          .divider {
            height: 1px;
            margin: 8px 0;
            background: ${palette['border-basic-color-4']};
          }
        `}
      </style>
    </>
  )
}
