import { Query, Resolver } from 'type-graphql'

/**
 * Common resolver.
 */
@Resolver()
export class CommonResolver {
  // #region Query

  @Query(() => String)
  welcome () {
    return 'Welcome to the GraphQL API!'
  }

  // #endregion
}
