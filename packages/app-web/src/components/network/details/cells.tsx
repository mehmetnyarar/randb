import { Cell } from '@app/logic'
import Link from 'next/link'
import React from 'react'

interface Props {
  items: Cell[]
}

/**
 * Cell list.
 */
export const CellList: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(cell => (
        <li key={cell.id}>
          <Link href='/cells/[name]' as={`/cells/${cell.name}`}>
            <a>{cell.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
