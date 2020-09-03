import { Middleware } from 'type-graphql/dist/interfaces/Middleware'
import * as typegoose from './typegoose'

/**
 * GraphQL middlewares.
 */
export const globalMiddlewares: Middleware<unknown>[] = [typegoose.middleware]
