import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { QueryBuilder } from '~/db'
import { Logger } from '~/logger'
import {
  DEFAULT_RNC,
  NetworkElementFilter,
  NetworkElementsFilter,
  Rnc,
  RncModel,
  Site,
  SiteModel
} from '~/models'
import { Authorize } from '~/modules'
import { createNetworkElementResolver } from './base'

export const logger = Logger.create({
  src: 'resolver/rnc'
})

const BaseResolver = createNetworkElementResolver<Rnc, Site>(
  Rnc,
  RncModel,
  Site,
  SiteModel,
  DEFAULT_RNC
)

/**
 * RNC resolver.
 */
@Resolver(Rnc)
export class RncResolver extends BaseResolver {
  // #region Query

  /**
   * Finds RNC.
   * @param [filter] Filter.
   * @returns RNC.
   */
  @Authorized(Authorize.any)
  @Query(() => [Rnc])
  async rncs (
    @Arg('filter', { nullable: true }) filter: NetworkElementsFilter = {}
  ) {
    const query = QueryBuilder.entities<Rnc>(RncModel, filter)
      .ids('id', filter.ids)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .conditions()

    logger.debug('bscs', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds a specific RNC.
   * @param [filter] Filter.
   * @returns RNC.
   */
  @Authorized(Authorize.any)
  @Query(() => Rnc, { nullable: true })
  async rnc (@Arg('filter') filter: NetworkElementFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Rnc>(RncModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('rnc', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion
}
