import { ApolloClientLocalState } from '@app/logic'
import { NextPage } from 'next'
import { TFunction } from 'next-i18next'

/**
 * Dynamic routing.
 */
export interface AppLinkPath<Query = {}> {
  pathname: string
  query: Query
}

/**
 * Application link.
 */
export interface AppLink<Query = {}> {
  as?: string
  path: string | AppLinkPath<Query>
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
