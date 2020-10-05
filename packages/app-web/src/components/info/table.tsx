import React from 'react'
import { Item } from './item'
import { InfoRecord } from './types'

interface Props {
  title?: string
  records: InfoRecord[]
}

/**
 * Info table.
 */
export const InfoTable: React.FC<Props> = props => {
  const { title, records } = props

  return (
    <table>
      {title && <caption>{title}</caption>}
      <tbody>
        {records.map((record, i) => (
          <Item key={i} {...record} />
        ))}
      </tbody>
    </table>
  )
}
