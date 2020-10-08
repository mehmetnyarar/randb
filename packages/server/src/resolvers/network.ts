import { join } from 'path'
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { ROOT_DIR } from '~/config'
import { GraphQLContext } from '~/graphql'
import { Logger } from '~/logger'
import { FileOptions } from '~/models'
import {
  Authorize,
  excel,
  getFile,
  NetworkImportInput,
  NetworkLog
} from '~/modules'

export const logger = Logger.create({
  src: 'resolver/network',
  file: 'info'
})

/**
 * FileSystem resolver.
 */
@Resolver()
export class NetworkResolver {
  // #region Mutation

  /**
   * Imports a network from an excel file.
   * @param input Input.
   * @param options Options.
   * @param context GraphQL context.
   */
  @Authorized(Authorize.admin)
  @Mutation(() => [NetworkLog], { nullable: true })
  async importNetwork (
    @Arg('data') input: NetworkImportInput,
    @Arg('options') options: FileOptions = {},
    @Ctx() { currentUser }: GraphQLContext
  ) {
    const { type, url, upload } = input
    const file = await getFile({ url, upload }, options)

    if (file) {
      const path = join(ROOT_DIR, file?.path)
      const reporter = await excel.importNetwork(type, path, currentUser)
      if (reporter) return reporter.logs
    }

    return undefined
  }

  // #endregion
}
