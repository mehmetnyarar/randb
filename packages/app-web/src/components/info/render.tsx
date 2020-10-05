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
  const { label, title, value, cspan } = props
  const span = cspan || (label ? 1 : 2)

  if (title) {
    return (
      <>
        <tr>
          <th colSpan={span}>{title}</th>
        </tr>
        <tr>
          <td colSpan={span}>{value}</td>
        </tr>
      </>
    )
  }

  return (
    <tr>
      {label && <th>{label}</th>}
      <td colSpan={span}>{value}</td>
    </tr>
  )
}
