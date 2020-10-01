import { Theme } from '@app/ui'
import React, { useContext } from 'react'

interface Props {
  margin?: number
  height?: number
  vertical?: boolean
}

/**
 * Divider.
 */
export const Divider: React.FC<Props> = ({ margin, height, vertical }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <div className={vertical ? 'divider-y' : 'divider-x'} />
      <style jsx>
        {`
          .divider-x {
            height: 1px;
            margin: ${margin || 8}px 0;
            background: ${palette['border-basic-color-4']};
          }
          .divider-y {
            width: 0;
            height: ${height || 16}px;
            margin: 0 ${margin || 8}px;
            border-right: 1px solid ${palette['border-basic-color-4']};
          }
        `}
      </style>
    </>
  )
}
