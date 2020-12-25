import { ReactNode } from 'react'

export type InfoValue = string | number | boolean
export type InfoValues = Record<string, InfoValue | undefined | null>

export interface InfoRecord {
  id: string
  title: string
  value?: InfoValue | InfoRecord | InfoRecord[] | null
  render?: ReactNode | null
}
