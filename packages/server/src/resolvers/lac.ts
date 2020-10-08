import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { QueryBuilder } from '~/db'
import { Logger } from '~/logger'
import {
  DEFAULT_LAC,
  Lac,
  LacModel,
  NetworkElementFilter,
  NetworkElementsFilter,
  Site,
  SiteModel
} from '~/models'
import { Authorize } from '~/modules'
import { createNetworkElementResolver } from './base'

export const logger = Logger.create({
  src: 'resolver/lac'
})

const BaseResolver = createNetworkElementResolver<Lac, Site>(
  Lac,
  LacModel,
  Site,
  SiteModel,
  DEFAULT_LAC
)

/**
 * LAC resolver.
 */
@Resolver(Lac)
export class LacResolver extends BaseResolver {
  // #region Query

  /**
   * Finds LAC.
   * @param [filter] Filter.
   * @returns LAC.
   */
  @Authorized(Authorize.any)
  @Query(() => [Lac])
  async lacs (
    @Arg('filter', { nullable: true }) filter: NetworkElementsFilter = {}
  ) {
    const query = QueryBuilder.entities<Lac>(LacModel, filter)
      .ids('id', filter.ids)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .conditions()

    logger.debug('lacs', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds a specific LAC.
   * @param [filter] Filter.
   * @returns LAC.
   */
  @Authorized(Authorize.any)
  @Query(() => Lac, { nullable: true })
  async lac (@Arg('filter') filter: NetworkElementFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Lac>(LacModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('lac', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion
}
