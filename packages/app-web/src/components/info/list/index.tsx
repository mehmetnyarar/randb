import React from 'react'
import { InfoRecord } from '../types'
import { Item } from './item'

interface Props {
  data: InfoRecord[]
  className?: string
}

/**
 * Info list.
 */
export const InfoList: React.FC<Props> = props => {
  const { data, className } = props

  return (
    <dl className={className}>
      {data.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </dl>
  )
}
