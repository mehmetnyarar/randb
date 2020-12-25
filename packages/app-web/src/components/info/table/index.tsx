import React from 'react'
import { InfoRecord } from '../types'
import { Item } from './item'

interface Props {
  data: InfoRecord[]
  caption?: string
  className?: string
}

/**
 * Info table.
 */
export const InfoTable: React.FC<Props> = props => {
  const { data, caption, className } = props

  return (
    <table className={className}>
      {caption && <caption>{caption}</caption>}
      <tbody>
        {data.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </tbody>
    </table>
  )
}
