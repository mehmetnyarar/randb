import React, { ReactNode } from 'react'

interface Props {
  label?: string
  title?: string
  value?: ReactNode
  cspan?: number
}

/**
 * Renders a React node.
 * @param props Props.
 */
export const Render: React.FC<Props> = props => {
  const { label, value, cspan = 1 } = props

  if (cspan > 1 || !label) {
    return (
      <>
        <tr>
          <th colSpan={cspan}>{label}</th>
        </tr>
        <tr>
          <td colSpan={cspan}>{value}</td>
        </tr>
      </>
    )
  }

  return (
    <tr>
      <th className='text-left'>{label}</th>
      <td>{value}</td>
    </tr>
  )
}
