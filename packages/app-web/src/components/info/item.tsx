import React from 'react'
import { Record } from './record'
import { Records } from './records'
import { Render } from './render'
import { InfoRecord } from './types'

interface Props extends InfoRecord {}

/**
 * Item.
 */
export const Item: React.FC<Props> = ({ label, value, print, cspan }) => {
  if (!label && !value && !print) return null

  // Custom render
  if (print) return <Render label={label} value={print} cspan={cspan} />

  // Render no value
  if (!value) return <Record label={label} value='' />

  // Render InfoRecord[]
  if (Array.isArray(value)) return <Records title={label} records={value} />

  // Render InfoRecord
  if (typeof value === 'object') {
    const values = Object.values(value)
    return <Record label={label} value={values} />
  }

  // Render string | number | boolean
  return <Record label={label} value={value} />
}
