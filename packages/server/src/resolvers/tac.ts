import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { QueryBuilder } from '~/db'
import { Logger } from '~/logger'
import {
  DEFAULT_TAC,
  NetworkElementFilter,
  NetworkElementsFilter,
  Site,
  SiteModel,
  Tac,
  TacModel
} from '~/models'
import { Authorize } from '~/modules'
import { createNetworkElementResolver } from './base'

export const logger = Logger.create({
  src: 'resolver/tac'
})

const BaseResolver = createNetworkElementResolver<Tac, Site>(
  Tac,
  TacModel,
  Site,
  SiteModel,
  DEFAULT_TAC
)

/**
 * TAC resolver.
 */
@Resolver(Tac)
export class TacResolver extends BaseResolver {
  // #region Query

  /**
   * Finds TAC.
   * @param [filter] Filter.
   * @returns TAC.
   */
  @Authorized(Authorize.any)
  @Query(() => [Tac])
  async tacs (
    @Arg('filter', { nullable: true }) filter: NetworkElementsFilter = {}
  ) {
    const query = QueryBuilder.entities<Tac>(TacModel, filter)
      .ids('id', filter.ids)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .conditions()

    logger.debug('tacs', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds a specific TAC.
   * @param [filter] Filter.
   * @returns TAC.
   */
  @Authorized(Authorize.any)
  @Query(() => Tac, { nullable: true })
  async tac (@Arg('filter') filter: NetworkElementFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Tac>(TacModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('tac', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion
}
