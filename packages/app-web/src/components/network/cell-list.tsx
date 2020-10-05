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
    <ul className='text-center'>
      {items.map((cell, i) => (
        <li key={i}>
          <Link href='/cells/[name]' as={`/cells/${cell.name}`}>
            <a>{cell.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
