import { ColorPalette, Theme } from '@app/ui'
import React, { useContext } from 'react'

interface Props {
  vertical?: boolean
  length?: number
  margin?: number
  color?: keyof ColorPalette
}

/**
 * Divider.
 */
export const Divider: React.FC<Props> = props => {
  const { vertical, length, margin, color = 'border-basic-color-3' } = props
  const { palette } = useContext(Theme)

  return (
    <>
      <div className={vertical ? 'divider-y' : 'divider-x'} />
      <style jsx>
        {`
          .divider-x {
            height: ${length || 1}px;
            margin: ${margin || 0}px 0;
            background: ${palette[color]};
          }
          .divider-y {
            width: 0;
            height: ${length || 16}px;
            margin: 0 ${margin || 0}px;
            border-right: 1px solid ${palette[color]};
          }
        `}
      </style>
    </>
  )
}
