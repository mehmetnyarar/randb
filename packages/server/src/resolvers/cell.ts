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
  CellFilter,
  CellModel,
  CellsFilter,
  DEFAULT_CELL,
  LacModel,
  RncModel,
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
  async bsc (@Root() entity: Cell) {
    return entity.bsc && (await BscModel.findById(entity.bsc))
  }

  @FieldResolver()
  async rnc (@Root() entity: Cell) {
    return entity.rnc && (await RncModel.findById(entity.rnc))
  }

  @FieldResolver()
  async tac (@Root() entity: Cell) {
    return entity.tac && (await TacModel.findById(entity.tac))
  }

  @FieldResolver()
  async lac (@Root() entity: Cell) {
    return entity.lac && (await LacModel.findById(entity.lac))
  }

  @FieldResolver()
  location (@Root() entity: Cell) {
    return toGeoLocation(entity.location)
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
