import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request, Response } from 'express'
import { TFunction } from 'i18next'
import { ExecutionParams } from 'subscriptions-transport-ws'
import { Language } from '~/models'
import { CurrentUser } from '~/modules'

/**
 * GraphQL context.
 */
export interface GraphQLContext {
  /**
   * Server request.
   */
  req: Request

  /**
   * Server response.
   */
  res: Response

  /**
   * i18n translator.
   */
  t: TFunction

  /**
   * Language.
   */
  lang: Language

  /**
   * Auth checker configuration.
   */
  auth?: boolean | string[]

  /**
   * Current user.
   */
  currentUser?: CurrentUser
}

/**
 * Context connection.
 */
export type GraphQLContextConnection = ExecutionParams<GraphQLContext>

/**
 * Context parameters.
 */
export interface GraphQLContextParams extends ExpressContext {
  /**
   * Server request.
   */
  req: Request

  /**
   * Server response.
   */
  res: Response

  /**
   * GraphQL connection for subscriptions.
   */
  connection?: GraphQLContextConnection
}

/**
 * Context generator.
 */
export type GraphQLContextFunction = ContextFunction<
  GraphQLContextParams,
  GraphQLContext
>
