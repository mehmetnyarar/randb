import { ApolloClientLocalState } from '@app/logic'
import { NextPage } from 'next'
import { TFunction } from 'next-i18next'

/**
 * Application link.
 */
export interface AppLink {
  path: string
  title: string
  description?: string
}

interface Props {
  t: TFunction
}
interface InitialProps {
  language?: string
  initialApolloState: ApolloClientLocalState
  namespacesRequired: string[]
}

/**
 * Next screen.
 */
export type NextScreen<P = {}, IP = {}> = NextPage<P & Props, IP & InitialProps>
