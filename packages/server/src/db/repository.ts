import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import equals from 'fast-deep-equal/es6'
import { toUpper } from 'lodash'
import { CreateQuery, FilterQuery } from 'mongoose'
import { Logger } from '~/logger'
import { Entity, EntityType, EventType, Log, LogModel } from '~/models'
import { Nullable } from '~/types'
import { DatabaseError } from './error'

/**
 * Entity manager.
 */
export class Repository<T extends Entity> {
  // #region Properties

  /**
   * Type of entity.
   */
  readonly type: EntityType

  /**
   * Entity model.
   */
  readonly model: ModelType<T>

  /**
   * Default values.
   */
  readonly defaults?: CreateQuery<T>

  /**
   * Logger.
   */
  readonly logger: Logger

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of Repository.
   * @param model Entity model.
   * @param [defaults] Default values.
   */
  constructor (model: ModelType<T>, defaults?: CreateQuery<T>) {
    this.type = toUpper(model.modelName) as EntityType
    this.model = model
    this.defaults = defaults
    this.logger = Logger.create({
      src: `repository/${model.modelName}`,
      file: 'info'
    })
  }

  // #endregion

  // #region Search

  /**
   * Finds documents.
   * @param [query={}] Query.
   * @param [log={}] Log.
   * @returns Entities.
   */
  public async find (
    query: FilterQuery<DocumentType<T>> = {},
    log: Partial<Log> = {}
  ) {
    const data =
      Object.keys(query).length > 0
        ? await this.model.find(query)
        : await this.model.find()

    // Log query for analytics
    if (log.origin) {
      await Promise.all(
        data.map(async item => {
          return LogModel.create({
            ...log,
            event: EventType.ENTITY_SEARCH,
            entity: this.type,
            entityId: item._id,
            data: JSON.stringify(query),
            isActive: true
          })
        })
      )
    }

    return data
  }

  /**
   * Finds a specific item.
   * @param [query={}] Query.
   * @param [log={}] Log.
   * @returns Entity if found, null otherwise.
   */
  public async findOne (
    query: FilterQuery<DocumentType<T>> = {},
    log: Partial<Log> = {}
  ) {
    const item =
      Object.keys(query).length > 0 ? await this.model.findOne(query) : null

    // Log query for analytics
    if (log.origin && item) {
      await LogModel.create({
        ...log,
        event: EventType.ENTITY_SEARCH,
        entity: this.type,
        entityId: item._id,
        data: JSON.stringify(query),
        isActive: true
      })
    }

    return item
  }

  /**
   * Finds a specific item by its id.
   * @param [id] ID.
   * @param [log={}] Log.
   * @returns Entity if found, null otherwise.
   */
  public async findById (id?: string, log: Partial<Log> = {}) {
    const item = id ? await this.model.findById(id) : null

    // Log query for analytics
    if (log.origin && item) {
      await LogModel.create({
        ...log,
        event: EventType.ENTITY_SEARCH,
        entity: this.type,
        entityId: item._id,
        data: JSON.stringify({ id }),
        isActive: true
      })
    }

    return item
  }

  // #endregion

  // #region Create

  /**
   * Creates a new entity.
   * @param doc New document.
   * @param [log={}] Log.
   * @returns New entity.
   */
  public async create (doc: Partial<T>, log: Partial<Log> = {}) {
    let entity: DocumentType<T>
    const createdAt = new Date()
    const { createdBy } = log

    try {
      entity = await this.model.create({
        ...(this.defaults || {}),
        ...doc,
        createdAt,
        createdBy
      } as CreateQuery<T>)
    } catch (error) {
      this.logger.error('create', { error })
      throw new DatabaseError('ENTITY_CREATE_ERROR', {
        operation: 'CREATE',
        entity: this.type,
        data: doc,
        error
      })
    }

    if (entity.logs) {
      try {
        entity.logs.push(
          (
            await LogModel.create({
              ...log,
              event: log.event || EventType.ENTITY_CREATE,
              entity: log.entity || this.type,
              entityId: entity._id,
              data: JSON.stringify(doc),
              createdAt,
              isActive: true
            } as CreateQuery<Log>)
          )._id
        )
        await entity.save()
      } catch (error) {
        this.logger.error('create/log', { error })
      }
    }

    entity.event = EventType.ENTITY_CREATE
    return entity
  }

  // #endregion

  // #region Update

  /**
   * Updates an entity.
   * @param entity Entity.
   * @param doc Document updates.
   * @param [log={}] Info.
   * @returns Updated entity.
   */
  public async update (
    entity: DocumentType<T>,
    doc: Partial<T>,
    log: Partial<Log> = {}
  ) {
    const updatedAt = new Date()
    const { createdBy: updatedBy } = log

    // Detect changes
    const keys = Object.keys(doc) as (keyof T)[]
    const values = keys.reduce((changes, key) => {
      const newValue = doc[key]
      const oldValue = entity[key]

      // REVIEW This equality check
      return equals(newValue, oldValue)
        ? changes
        : {
          ...changes,
          [key]: newValue
        }
    }, {} as Partial<T>)

    if (!Object.keys(values).length) {
      return entity
    }

    try {
      entity.set({
        ...values,
        updatedAt,
        updatedBy,
        logs: entity.logs
          ? entity.logs.concat(
            (
              await LogModel.create({
                ...log,
                event: log.event || EventType.ENTITY_UPDATE,
                entity: log.entity || this.type,
                entityId: entity._id,
                data: JSON.stringify(doc),
                createdAt: updatedAt,
                isActive: true
              } as CreateQuery<Log>)
            )._id
          )
          : undefined
      })

      await entity.save()

      entity.event = EventType.ENTITY_UPDATE
      return entity
    } catch (error) {
      this.logger.error('update', { error })
      throw new DatabaseError('ENTITY_UPDATE_ERROR', {
        operation: 'UPDATE',
        entity: this.type,
        id: entity.id,
        data: doc,
        error
      })
    }
  }

  /**
   * Updates entity.
   * @param id Entity ID.
   * @param doc Document updates.
   * @param [log={}] Log.
   * @returns Updated entity.
   */
  public async updateById (id: string, doc: Partial<T>, log: Partial<Log> = {}) {
    const entity = await this.findById(id)
    if (!entity) {
      throw new DatabaseError('ENTITY_NOT_FOUND', {
        operation: 'UPDATE',
        entity: this.type,
        id,
        data: doc
      })
    }

    return this.update(entity, doc, log)
  }

  // #endregion

  // #region Upsert

  /**
   * Updates an entity if exists, creates otherwise.
   * @param entity Entity.
   * @param doc Document.
   * @param [log={}] Log.
   * @returns Entity.
   */
  public async upsert (
    entity: Nullable<DocumentType<T>>,
    doc: Partial<T>,
    log: Partial<Log> = {}
  ) {
    if (entity) return this.update(entity, doc, log)
    else return this.create(doc, log)
  }

  /**
   * Updates an entity if exists, creates otherwise.
   * @param one Conditions to find the entity.
   * @param doc Document.
   * @param [log={}] Log.
   * @returns Entity.
   */
  public async upsertOne (
    one: FilterQuery<DocumentType<T>>,
    doc: Partial<T>,
    log: Partial<Log> = {}
  ) {
    const entity = await this.findOne(one)
    return this.upsert(entity, doc, log)
  }

  /**
   * Updates an entity if exists, creates otherwise.
   * @param id Entity ID.
   * @param doc Document.
   * @param [log={}] Log.
   * @returns Entity.
   */
  public async upsertById (
    id: Nullable<string>,
    doc: Partial<T>,
    log: Partial<Log> = {}
  ) {
    const entity = id ? await this.findById(id) : undefined
    return this.upsert(entity, doc, log)
  }

  // #endregion

  // #region Delete

  /**
   * Deletes an entity permanently.
   * @param entity Entity.
   * @param [log={}] Log.
   * @returns Null.
   */
  public async delete (entity: DocumentType<T>, log: Partial<Log> = {}) {
    try {
      await entity.remove()
    } catch (error) {
      this.logger.error('delete', { error })
      throw new DatabaseError('ENTITY_DELETE_ERROR', {
        operation: 'DELETE',
        entity: this.type,
        id: entity.id,
        error
      })
    }

    try {
      await LogModel.create({
        ...log,
        event: log.event || EventType.ENTITY_DELETE,
        entity: log.entity || this.type,
        entityId: entity._id,
        createdAt: new Date(),
        isActive: true
      } as CreateQuery<Log>)
    } catch (error) {
      // fail silently
    }

    return true
  }

  /**
   * Deletes an entity permanently.
   * @param id Entity ID.
   * @param [log={}] Log.
   * @returns Null.
   */
  public async deleteById (id: string, log: Partial<Log> = {}) {
    const entity = await this.findById(id)
    if (!entity) {
      throw new DatabaseError('ENTITY_NOT_FOUND', {
        operation: 'DELETE',
        entity: this.type,
        id
      })
    }

    return this.delete(entity, log)
  }

  // #endregion
}
