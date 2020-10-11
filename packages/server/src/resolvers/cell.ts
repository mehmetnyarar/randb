import { pick, without } from 'lodash'
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
  AntennaModel,
  BscModel,
  Cell,
  CellFilter,
  CellModel,
  CellsFilter,
  DEFAULT_CELL,
  DeleteEntitiesInput,
  DeleteEntityInput,
  EntityType,
  getLog,
  getStrId,
  LacModel,
  NetworkType,
  RncModel,
  Site,
  SiteModel,
  TacModel,
  toGeoLocation,
  toStrId
} from '~/models'
import { Authorize, ConnectionInput, edge, paginate, response } from '~/modules'
import { createEntityResolver } from './base'

type CellInfo = Pick<Cell, '_id' | 'network'>
type CellsBySites = { [key: string]: CellInfo[] }

const logger = Logger.create({
  src: 'resolver/site'
})

// #region Pagination

@ObjectType()
export class CellEdge extends edge(Cell) {}

@ObjectType()
export class CellConnection extends response(CellEdge) {}

// #endregion

const BaseResolver = createEntityResolver<Cell>(Cell, CellModel, DEFAULT_CELL)

/**
 * Cell resolver.
 */
@Resolver(Cell)
export class CellResolver extends BaseResolver {
  // #region Field

  @FieldResolver()
  async bsc (@Root() cell: Cell) {
    return cell.bsc && (await BscModel.findById(cell.bsc))
  }

  @FieldResolver()
  async rnc (@Root() cell: Cell) {
    return cell.rnc && (await RncModel.findById(cell.rnc))
  }

  @FieldResolver()
  async tac (@Root() cell: Cell) {
    return cell.tac && (await TacModel.findById(cell.tac))
  }

  @FieldResolver()
  async lac (@Root() cell: Cell) {
    return cell.lac && (await LacModel.findById(cell.lac))
  }

  @FieldResolver()
  async site (@Root() cell: Cell) {
    return SiteModel.findById(cell.site)
  }

  @FieldResolver()
  async antenna (@Root() cell: Cell) {
    return cell.antenna && (await AntennaModel.findById(cell.antenna))
  }

  @FieldResolver()
  location (@Root() cell: Cell) {
    return toGeoLocation(cell.location)
  }

  // #endregion

  // #region Query

  /**
   * Finds cells.
   * @param [filter] Filter.
   * @returns Cells.
   */
  @Authorized(Authorize.any)
  @Query(() => [Cell])
  async cells (@Arg('filter', { nullable: true }) filter: CellsFilter = {}) {
    const query = QueryBuilder.entities<Cell>(CellModel, filter)
      .ids('bsc', filter.bscs)
      .ids('rnc', filter.rncs)
      .ids('tac', filter.tacs)
      .ids('lac', filter.lacs)
      .id('site', filter.site)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .in('scenario', filter.scenarios)
      .eq('g2', filter.g2)
      .eq('g3', filter.g3)
      .eq('g4', filter.g4)
      .conditions()

    logger.debug('cells', { query })
    const items = await this.repo.find(query)

    return items
  }

  /**
   * Finds cells.
   * @param [filter] Filter.
   * @param [connection] Pagination connection.
   * @returns CellConnection.
   */
  @Authorized(Authorize.any)
  @Query(() => CellConnection)
  async pagedCells (
    @Arg('filter', { nullable: true }) filter: CellsFilter = {},
    @Arg('connection', { nullable: true }) connection: ConnectionInput = {}
  ) {
    const query = QueryBuilder.entities<Cell>(CellModel, filter)
      .ids('bsc', filter.bscs)
      .ids('rnc', filter.rncs)
      .ids('tac', filter.tacs)
      .ids('lac', filter.lacs)
      .id('site', filter.site)
      .re('name', filter.name)
      .eq('type', filter.type)
      .in('type', filter.types)
      .eq('network', filter.network)
      .in('network', filter.networks)
      .in('scenario', filter.scenarios)
      .eq('g2', filter.g2)
      .eq('g3', filter.g3)
      .eq('g4', filter.g4)
      .conditions()

    logger.debug('pagedCells', { filter, query })
    const items = await this.repo.find(query)

    return paginate(items, connection)
  }

  /**
   * Finds a specific cell.
   * @param [filter] Filter.
   * @returns Cell.
   */
  @Authorized(Authorize.any)
  @Query(() => Cell, { nullable: true })
  async cell (@Arg('filter') filter: CellFilter) {
    if (filter.id) this.repo.findById(filter.id)

    const query = QueryBuilder.entity<Cell>(CellModel, filter)
      .re('name', filter.name)
      .conditions()

    logger.debug('cell', { filter, query })
    return this.repo.findOne(query)
  }

  // #endregion

  // #region Mutation

  /**
   * Deletes the cell from the system.
   * @param input Input.
   * @param context GraphQL context.
   * @returns True if the operation succeeds.
   */
  @Authorized(Authorize.manager)
  @Mutation(() => Boolean)
  async deleteCell (
    @Arg('data') input: DeleteEntityInput,
    @Ctx() { currentUser }: GraphQLContext
  ) {
    const { id } = input
    const log = getLog(input, {}, currentUser)

    // find cell
    const cell = await this.repo.findById(id)
    if (!cell) {
      throw new DatabaseError('ENTITY_NOT_FOUND', {
        operation: 'DELETE',
        entity: EntityType.CELL,
        id,
        data: JSON.stringify(input)
      })
    }

    const sites = new Repository(SiteModel)

    // find site
    const siteId = getStrId(cell.site)
    const site = await sites.findById(siteId)
    if (!site) {
      throw new DatabaseError('ENTITY_NOT_FOUND', {
        operation: 'DELETE',
        entity: EntityType.CELL,
        id,
        data: JSON.stringify({ ...input, siteId })
      })
    }

    // remove cell from the site
    const updates: Partial<Site> = {
      children: without(site.children, cell._id)
    }
    switch (cell.network) {
      case NetworkType.G2:
        updates.g2 = without(site.g2, cell._id)
        break
      case NetworkType.G3:
        updates.g3 = without(site.g3, cell._id)
        break
      case NetworkType.G4:
        updates.g4 = without(site.g4, cell._id)
        break
    }
    await sites.update(site, updates, log)

    // delete cell
    await this.repo.delete(cell, log)

    return true
  }

  /**
   * Deletes cells from the system.
   * @param input Input.
   * @param context GraphQL context.
   * @returns True if the operation succeeds.
   */
  @Authorized(Authorize.manager)
  @Mutation(() => Boolean)
  async deleteCells (
    @Arg('data') input: DeleteEntitiesInput,
    @Ctx() { currentUser }: GraphQLContext
  ) {
    const { ids } = input
    const log = getLog(input, {}, currentUser)

    // find cells
    const cells = await this.repo.find({ _id: { $in: ids } })

    // organize cells by sites
    const cellsBySites = cells.reduce((result, cell) => {
      const cellInfo = pick(cell, ['_id', 'network'])
      const siteId = toStrId(cell.site)
      const keys = Object.keys(result)
      result[siteId] = keys.includes(siteId)
        ? result[siteId].concat(cellInfo)
        : [cellInfo]

      return result
    }, {} as CellsBySites)

    // Remove cells from sites
    const sites = new Repository(SiteModel)
    const siteIds = Object.keys(cellsBySites)
    for (const siteId of siteIds) {
      const site = await sites.findById(siteId)

      if (site) {
        const cellsBySite = cellsBySites[siteId]
        const children = cellsBySite.map(cell => cell._id)
        const updates: Partial<Site> = {
          children: without(site.children, ...children)
        }

        site.g2 = without(
          site.g2,
          ...cellsBySite
            .filter(cell => cell.network === NetworkType.G2)
            .map(cell => cell._id)
        )
        site.g3 = without(
          site.g3,
          ...cellsBySite
            .filter(cell => cell.network === NetworkType.G3)
            .map(cell => cell._id)
        )
        site.g4 = without(
          site.g4,
          ...cellsBySite
            .filter(cell => cell.network === NetworkType.G4)
            .map(cell => cell._id)
        )

        await sites.update(site, updates, log)
      }
    }

    // Delete cells
    await this.repo.deleteMany(ids, log)

    return true
  }

  // #endregion
}
