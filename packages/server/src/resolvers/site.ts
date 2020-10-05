import {
  Arg,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { QueryBuilder } from '~/db'
import { Logger } from '~/logger'
import {
  BscModel,
  Cell,
  CellModel,
  DEFAULT_SITE,
  LacModel,
  refsToObjIds,
  RncModel,
  Site,
  SiteFilter,
  SiteModel,
  SitesFilter,
  TacModel,
  toGeoLocation
} from '~/models'
import { ConnectionInput, edge, paginate, response } from '~/modules'
import { createNetworkElementResolver } from './base'

const logger = Logger.create({
  src: 'resolver/site'
})

@ObjectType()
export class SiteEdge extends edge(Site) {}

@ObjectType()
export class SiteConnection extends response(SiteEdge) {}

const BaseResolver = createNetworkElementResolver<Site, Cell>(
  Site,
  SiteModel,
  Cell,
  CellModel,
  DEFAULT_SITE
)

/**
 * Site resolver.
 */
@Resolver(Site)
export class SiteResolver extends BaseResolver {
  // #region Field

  @FieldResolver()
  async bsc (@Root() entity: Site) {
    return entity.bsc && (await BscModel.findById(entity.bsc))
  }

  @FieldResolver()
  async rnc (@Root() entity: Site) {
    return entity.rnc && (await RncModel.findById(entity.rnc))
  }

  @FieldResolver()
  async tac (@Root() entity: Site) {
    return entity.tac && (await TacModel.findById(entity.tac))
  }

  @FieldResolver()
  async lac (@Root() entity: Site) {
    return entity.lac && (await LacModel.findById(entity.lac))
  }

  @FieldResolver()
  location (@Root() entity: Site) {
    return toGeoLocation(entity.location)
  }

  @FieldResolver()
  async g2 (@Root() entity: Site) {
    if (!entity.g2 || !entity.g2.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(entity.g2) } })
  }

  @FieldResolver()
  async g3 (@Root() entity: Site) {
    if (!entity.g3 || !entity.g3.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(entity.g3) } })
  }

  @FieldResolver()
  async g4 (@Root() entity: Site) {
    if (!entity.g4 || !entity.g4.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(entity.g4) } })
  }

  // #endregion

  // #region Query

  /**
   * Finds sites.
   * @param [filter] Filter.
   * @returns Sites.
   */
  @Query(() => [Site])
  async sites (@Arg('filter', { nullable: true }) filter: SitesFilter = {}) {
    const query = QueryBuilder.entities<Site>(SiteModel, filter)
      .ids('id', filter.ids)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .ids('bsc', filter.bscs)
      .ids('rnc', filter.rncs)
      .ids('tac', filter.tacs)
      .ids('lac', filter.lacs)
      .conditions()

    logger.debug('sites', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds sites.
   * @param [filter] Filter.
   * @param [connection] Pagination connection.
   * @returns SiteConnection.
   */
  @Query(() => SiteConnection)
  async pagedSites (
    @Arg('filter', { nullable: true }) filter: SitesFilter = {},
    @Arg('connection', { nullable: true }) connection: ConnectionInput = {}
  ) {
    const query = QueryBuilder.entities<Site>(SiteModel, filter)
      .ids('id', filter.ids)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .ids('bsc', filter.bscs)
      .ids('rnc', filter.rncs)
      .ids('tac', filter.tacs)
      .ids('lac', filter.lacs)
      .conditions()

    logger.debug('pagedSites', { filter, query })
    const items = await this.repo.find(query)

    return paginate(items, connection)
  }

  /**
   * Finds a specific site.
   * @param [filter] Filter.
   * @returns Site.
   */
  @Query(() => Site, { nullable: true })
  async site (@Arg('filter') filter: SiteFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Site>(SiteModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('site', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion
}
