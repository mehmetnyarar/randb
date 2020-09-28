import { Ctx, Query, Resolver } from 'type-graphql'
import { GraphQLContext } from '~/graphql'

/**
 * Common resolver.
 */
@Resolver()
export class CommonResolver {
  // #region Query

  @Query(() => String)
  welcome (@Ctx() { t }: GraphQLContext) {
    return t('welcome')
  }

  // #endregion
}
