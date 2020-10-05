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
  AntennaModel,
  BscModel,
  Cell,
  CellFilter,
  CellModel,
  CellsFilter,
  DEFAULT_CELL,
  LacModel,
  RncModel,
  SiteModel,
  TacModel,
  toGeoLocation
} from '~/models'
import { ConnectionInput, edge, paginate, response } from '~/modules'
import { createEntityResolver } from './base'

const logger = Logger.create({
  src: 'resolver/site'
})

@ObjectType()
export class CellEdge extends edge(Cell) {}

@ObjectType()
export class CellConnection extends response(CellEdge) {}

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
  @Query(() => [Cell])
  async cells (@Arg('filter', { nullable: true }) filter: CellsFilter = {}) {
    const query = QueryBuilder.entities<Cell>(CellModel, filter)
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
  @Query(() => CellConnection)
  async pagedCells (
    @Arg('filter', { nullable: true }) filter: CellsFilter = {},
    @Arg('connection', { nullable: true }) connection: ConnectionInput = {}
  ) {
    const query = QueryBuilder.entities<Cell>(CellModel, filter)
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

    logger.debug('pagedCells', { filter, query })
    const items = await this.repo.find(query)

    return paginate(items, connection)
  }

  /**
   * Finds a specific cell.
   * @param [filter] Filter.
   * @returns Cell.
   */
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
}
