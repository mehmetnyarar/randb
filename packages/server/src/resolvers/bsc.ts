import { Arg, Query, Resolver } from 'type-graphql'
import { QueryBuilder } from '~/db'
import { Logger } from '~/logger'
import {
  Bsc,
  BscModel,
  DEFAULT_BSC,
  NetworkElementFilter,
  NetworkElementsFilter,
  Site,
  SiteModel
} from '~/models'
import { createNetworkElementResolver } from './base'

export const logger = Logger.create({
  src: 'resolver/bsc'
})

const BaseResolver = createNetworkElementResolver<Bsc, Site>(
  Bsc,
  BscModel,
  Site,
  SiteModel,
  DEFAULT_BSC
)

/**
 * BSC resolver.
 */
@Resolver(Bsc)
export class BscResolver extends BaseResolver {
  // #region Query

  /**
   * Finds BSCs.
   * @param [filter] Filter.
   * @returns BSCs.
   */
  @Query(() => [Bsc])
  async bscs (
    @Arg('filter', { nullable: true }) filter: NetworkElementsFilter = {}
  ) {
    const query = QueryBuilder.entities<Bsc>(BscModel, filter)
      .ids('id', filter.ids)
      .eq('type', filter.type)
      .in('type', filter.types)
      .re('name', filter.name)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .conditions()

    logger.debug('bscs', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds a specific BSC.
   * @param [filter] Filter.
   * @returns BSC.
   */
  @Query(() => Bsc, { nullable: true })
  async bsc (@Arg('filter') filter: NetworkElementFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Bsc>(BscModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('bsc', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion
}
