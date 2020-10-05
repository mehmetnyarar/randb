import { ReactNode } from 'react'

export type InfoValue = string | number | boolean

export interface InfoRecord {
  label?: string
  value?: InfoValue | InfoRecord | InfoRecord[] | null
  print?: ReactNode | null
}
