import React from 'react'
import { Record } from './record'
import { InfoRecord } from './types'

interface Props {
  title: string
  records: InfoRecord[]
}

/**
 * Renders InfoRecord[].
 * @param props Props.
 */
export const Records: React.FC<Props> = ({ title, records }) => {
  return (
    <>
      {title && (
        <tr>
          <th colSpan={2}>{title}</th>
        </tr>
      )}
      {records.map((record, i) => (
        <Record key={i} {...record} />
      ))}
    </>
  )
}
