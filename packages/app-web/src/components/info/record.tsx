import React from 'react'
import { InfoRecord } from './types'

interface Props extends InfoRecord {}

/**
 * Renders InfoRecord.
 * @param props Props.
 */
export const Record: React.FC<Props> = props => {
  const { label, value } = props

  return (
    <tr>
      {label && <th className='text-left'>{label}</th>}
      <td colSpan={label ? 1 : 2}>
        {Array.isArray(value) ? (
          <ul>
            {value.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        ) : (
          value
        )}
      </td>
    </tr>
  )
}
