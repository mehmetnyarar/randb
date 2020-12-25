import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import React from 'react'
import { InfoRecord } from '../types'

interface Props extends InfoRecord {}

/**
 * Info item.
 */
export const Item: React.FC<Props> = props => {
  const { title, value, render } = props

  if (!render && isNil(value)) return null

  return (
    <tr>
      <th>{title}</th>
      <td>
        {render}
        {isNil(value) ? (
          '-'
        ) : Array.isArray(value) ? (
          value.map(item => <Item key={item.id} {...item} />)
        ) : isObject(value) ? (
          <Item {...value} />
        ) : (
          String(value)
        )}
      </td>
    </tr>
  )
}
