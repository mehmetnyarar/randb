import { without } from 'lodash'
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { DatabaseError, QueryBuilder, Repository } from '~/db'
import { GraphQLContext } from '~/graphql'
import { Logger } from '~/logger'
import {
  BscModel,
  Cell,
  CellModel,
  DEFAULT_SITE,
  DeleteEntityInput,
  EntityType,
  getLog,
  LacModel,
  refsToObjIds,
  RncModel,
  Site,
  SiteFilter,
  SiteModel,
  SitesFilter,
  TacModel,
  toGeoLocation,
  toStrId
} from '~/models'
import { Authorize, ConnectionInput, edge, paginate, response } from '~/modules'
import { createNetworkElementResolver } from './base'

const logger = Logger.create({
  src: 'resolver/site'
})

// #region Pagination

@ObjectType()
export class SiteEdge extends edge(Site) {}

@ObjectType()
export class SiteConnection extends response(SiteEdge) {}

// #endregion

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
  async bsc (@Root() site: Site) {
    return site.bsc && (await BscModel.findById(site.bsc))
  }

  @FieldResolver()
  async rnc (@Root() site: Site) {
    return site.rnc && (await RncModel.findById(site.rnc))
  }

  @FieldResolver()
  async tac (@Root() site: Site) {
    return site.tac && (await TacModel.findById(site.tac))
  }

  @FieldResolver()
  async lac (@Root() site: Site) {
    return site.lac && (await LacModel.findById(site.lac))
  }

  @FieldResolver()
  location (@Root() site: Site) {
    return toGeoLocation(site.location)
  }

  @FieldResolver()
  async g2 (@Root() site: Site) {
    if (!site.g2 || !site.g2.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(site.g2) } })
  }

  @FieldResolver()
  async g3 (@Root() site: Site) {
    if (!site.g3 || !site.g3.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(site.g3) } })
  }

  @FieldResolver()
  async g4 (@Root() site: Site) {
    if (!site.g4 || !site.g4.length) return []
    return CellModel.find({ _id: { $in: refsToObjIds(site.g4) } })
  }

  // #endregion

  // #region Query

  /**
   * Finds sites.
   * @param [filter] Filter.
   * @returns Sites.
   */
  @Authorized(Authorize.any)
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
  @Authorized(Authorize.any)
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
  @Authorized(Authorize.any)
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

  // #region Mutation

  /**
   * Deletes the site from the system.
   * @param input Input.
   * @param context GraphQL context.
   * @returns True if the operation succeeds.
   */
  @Authorized(Authorize.manager)
  @Mutation(() => Boolean)
  async deleteSite (
    @Arg('data') input: DeleteEntityInput,
    @Ctx() { currentUser }: GraphQLContext
  ) {
    const { id } = input
    const log = getLog(input, {}, currentUser)

    // find the cell
    const site = await this.repo.findById(id)
    if (!site) {
      throw new DatabaseError('ENTITY_NOT_FOUND', {
        operation: 'DELETE',
        entity: EntityType.SITE,
        id,
        data: JSON.stringify(input)
      })
    }

    // Remove from BSC
    const bscs = new Repository(BscModel)
    const bsc = site.bsc ? await bscs.findById(toStrId(site.bsc)) : undefined
    if (bsc) {
      await bscs.update(bsc, { children: without(bsc.children, site._id) }, log)
    }

    // Remove from RNC
    const rncs = new Repository(RncModel)
    const rnc = site.rnc ? await rncs.findById(toStrId(site.rnc)) : undefined
    if (rnc) {
      await rncs.update(rnc, { children: without(rnc.children, site._id) }, log)
    }

    // Remove from TAC
    const tacs = new Repository(TacModel)
    const tac = site.tac ? await tacs.findById(toStrId(site.tac)) : undefined
    if (tac) {
      await tacs.update(tac, { children: without(tac.children, site._id) }, log)
    }

    // Remove from LAC
    const lacs = new Repository(LacModel)
    const lac = site.lac ? await lacs.findById(toStrId(site.lac)) : undefined
    if (lac) {
      await lacs.update(lac, { children: without(lac.children, site._id) }, log)
    }

    // Delete all the cells
    const cells = new Repository(CellModel)
    await cells.deleteMany(site.children.map(toStrId))

    // Delete the site
    await this.repo.delete(site, log)

    return true
  }

  // #endregion
}
