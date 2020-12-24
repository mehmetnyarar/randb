import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { isNil, isObject, isPlainObject, isRegExp, isUndefined } from 'lodash'
import { DocumentQuery, Types } from 'mongoose'
import { isProduction, Phase } from '~/config'
import {
  DateRangeFilter,
  EntitiesFilter,
  Entity,
  EntityFilter,
  NumberRangeFilter
} from '~/models'
import { BETWEEN, SANITIZE } from './const'
import { RegExOptions } from './types'

/**
 * Query builder.
 */
export class QueryBuilder<T extends Entity, QueryHelpers = {}> {
  // #region Properties

  public readonly model: ModelType<T, QueryHelpers>

  /**
   * Document query.
   */
  public query: DocumentQuery<
    DocumentType<T>[],
    DocumentType<T>,
    QueryHelpers
  > &
    QueryHelpers

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of QueryBuilder.
   * @param model Entity model.
   */
  constructor (model: ModelType<T, QueryHelpers>) {
    this.model = model
    this.query = this.model.find()
  }

  // #endregion

  // #region Helpers

  /**
   * Resets the query.
   */
  public reset () {
    this.query = this.model.find()
  }

  /**
   * Returns the current query filter (also known as conditions) as a POJO.
   * @returns Query conditions.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-getFilter
   */
  public conditions () {
    return this.query.getFilter()
  }

  // #endregion

  // #region Comparison

  /**
   * Specifies the complementary comparison value for paths specified with where().
   * Matches values that are equal to a specified value.
   * @param path Path.
   * @param [value] Any value.
   * @param [omitKeys] Determines which object keys to be removed.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-equals
   * @see https://docs.mongodb.com/manual/reference/operator/query/eq/
   */
  public eq<U = any> (path?: keyof T, value?: U, omitKeys?: 'falsy' | 'nil') {
    if (!isUndefined(value)) {
      const isObj = isObject(value)
      const isPlObj = isPlainObject(value)
      console.log('eq', { path, value, omitKeys, isObj, isPlObj })

      if (omitKeys && isObj) {
        const obj: Record<string, any> = value
        const or = Object.keys(obj).reduce((arr, key) => {
          const v = obj[key]

          if (omitKeys === 'falsy' && !v) return arr
          else if (omitKeys === 'nil' && isNil(v)) return arr

          const filterValue =
            typeof v === 'string' ? { $regex: new RegExp(v, 'gi') } : { $eq: v }
          const filter = { [`${path}.${key}`]: filterValue }
          console.log({ key, v, filterValue, filter })

          return arr.concat(filter)
        }, [] as any[])
        console.log('eq', { or })
        if (or.length) this.query = this.query.or(or)
      } else {
        this.query = this.query.where(path, value)
      }
    }

    return this
  }

  /**
   * Specifies a $gt query condition.
   * Matches values that are greater than a specified value.
   * @param path Path.
   * @param [value] Number or date.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-gt
   * @see https://docs.mongodb.com/manual/reference/operator/query/gt/
   */
  public gt<U = number | Date> (path?: keyof T, value?: U) {
    if (!isUndefined(value)) {
      this.query = this.query.gt(path as string, value)
    }

    return this
  }

  /**
   * Specifies a $gte query condition.
   * Matches values that are greater than or equal to a specified value.
   * @param path Path.
   * @param [value] Number or date.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-gte
   * @see https://docs.mongodb.com/manual/reference/operator/query/gte/
   */
  public gte<U = number | Date> (path?: keyof T, value?: U) {
    if (!isUndefined(value)) {
      this.query = this.query.gte(path as string, value)
    }

    return this
  }

  /**
   * Specifies an $in query condition.
   * Matches any of the values specified in an array.
   * @param path Path.
   * @param [value] Array.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-in
   * @see https://docs.mongodb.com/manual/reference/operator/query/in/
   */
  public in<U = any> (path?: keyof T, value?: U[]) {
    if (value && value.length) {
      this.query = this.query.in(path as string, value)
    }

    return this
  }

  /**
   * Specifies a $lt query condition.
   * Matches values that are less than a specified value.
   * @param path Path.
   * @param [value] Number or date.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-lt
   * @see https://docs.mongodb.com/manual/reference/operator/query/lt/
   */
  public lt<U = number | Date> (path?: keyof T, value?: U) {
    if (!isUndefined(value)) {
      this.query = this.query.lt(path as string, value)
    }

    return this
  }

  /**
   * Specifies a $lte query condition.
   * Matches values that are less than or equal to a specified value.
   * @param path Path.
   * @param [value] Value.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-lte
   * @see https://docs.mongodb.com/manual/reference/operator/query/lte/
   */
  public lte<U = number | Date> (path?: keyof T, value?: U) {
    if (!isUndefined(value)) {
      this.query = this.query.lte(path as string, value)
    }

    return this
  }

  /**
   * Specifies a $ne query condition.
   * Matches all values that are not equal to a specified value.
   * @param path Path.
   * @param [value] Any value.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-ne
   * @see https://docs.mongodb.com/manual/reference/operator/query/ne/
   */
  public ne<U = any> (path: keyof T, value?: U) {
    if (!isUndefined(value)) {
      this.query = this.query.ne(path as string, value)
    }

    return this
  }

  // #endregion

  // #region Logical

  /**
   * Specifies arguments for a $and condition.
   * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
   * @param conditions Query conditions.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-and
   * @see https://docs.mongodb.com/manual/reference/operator/query/and/
   */
  public and (conditions?: any[]) {
    if (conditions && conditions.length) {
      const current = this.query.getFilter()
      const queries = conditions.reduce((arr, condition) => {
        return arr.concat(
          Object.keys(condition).map(key => ({
            [key]: condition[key as keyof T]
          }))
        )
      }, [] as any[])

      this.query = current.$and
        ? this.query.and([...current.$and, ...queries])
        : this.query.and(queries)
    }

    return this
  }

  /**
   * Specifies arguments for a $and condition.
   * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
   * @param conditions Query conditions.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-and
   * @see https://docs.mongodb.com/manual/reference/operator/query/and/
   */
  public or (conditions?: any[]) {
    if (conditions && conditions.length) {
      const current = this.query.getFilter()
      const queries = conditions.reduce((arr, condition) => {
        return arr.concat(
          Object.keys(condition).map(key => ({
            [key]: condition[key as keyof T]
          }))
        )
      }, [] as any[])

      this.query = current.$or
        ? this.query.or([...current.$or, ...queries])
        : this.query.or(queries)
    }

    return this
  }

  // #endregion

  // #region Element
  // #endregion

  // #region Evaluation

  /**
   * Specifies a $regex query condition.
   * Selects documents where values match a specified regular expression.
   * @param path Path.
   * @param [value] String.
   * @param [options] Options.
   * @returns QueryBuilder.
   * @see https://mongoosejs.com/docs/api/query.html#query_Query-regex
   * @see https://docs.mongodb.com/manual/reference/operator/query/regex/
   */
  public re (path: keyof T, value?: string, options: RegExOptions = {}) {
    if (value) {
      const { remove, flags = 'gi' } = options
      const regex = remove
        ? new RegExp(
          value.replace(isRegExp(remove) ? remove : SANITIZE.default, ''),
          flags
        )
        : new RegExp(value, flags)

      this.query = this.query.regex(path as string, regex)
    }

    return this
  }

  // #endregion

  // #region Custom

  /**
   * Matches values with the given range.
   * @param path Path.
   * @param [value] Range.
   * @param [options] Options.
   * @returns QueryBuilder.
   */
  public between (
    path: keyof T,
    value?: DateRangeFilter | NumberRangeFilter,
    options = BETWEEN
  ) {
    if (value) {
      const { min, max } = value

      if (min && max) {
        return this.and([
          { [path]: options.min ? { $gte: min } : { $gt: min } },
          { [path]: options.max ? { $lte: max } : { $lt: max } }
        ])
      } else if (min) {
        this.query = options.min
          ? this.query.gte(path as string, min)
          : this.query.gt(path as string, min)
      } else if (max) {
        this.query = options.max
          ? this.query.lte(path as string, max)
          : this.query.lt(path as string, max)
      }
    }

    return this
  }

  /**
   * Matches values with the given email address.
   * @param path Path.
   * @param [value] E-mail address.
   * @returns QueryBuilder.
   */
  public email (path: keyof T, value?: string) {
    return this.re(path, value, { remove: SANITIZE.email })
  }

  /**
   * Matches values with the given ID.
   * @param path Path.
   * @param [value] ID.
   * @returns QueryBuilder.
   */
  public id (path: keyof T, value?: string) {
    if (!value) return this
    return path === 'id'
      ? this.eq('_id', Types.ObjectId(value))
      : this.eq(path, Types.ObjectId(value))
  }

  /**
   * Matches values with the given IDs.
   * @param path Path.
   * @param [value] IDs.
   * @returns QueryBuilder.
   */
  public ids (path: keyof T, value?: string[]) {
    if (!value || !value.length) return this
    return path === 'id'
      ? this.in('_id', value.map(Types.ObjectId))
      : this.in(path, value.map(Types.ObjectId))
  }

  /**
   * Determines the visibility of an entity.
   * @param path Path.
   * @param [value] Boolean.
   * @param [phase] Application phase.
   * @returns QueryBuilder.
   */
  public visible (path: keyof T, value?: boolean, phase?: Phase) {
    return isProduction(phase)
      ? value
        ? this.eq(path, true)
        : this.ne(path, true)
      : isUndefined(value)
        ? this
        : this.eq(path, value)
  }

  // #endregion

  // #region Static

  /**
   * Creates a instance of QueryBuilder for finding entities.
   * @param [filter] Filter.
   * @returns QueryBuilder.
   */
  static entities<T extends Entity, Helpers = {}> (
    model: ModelType<T, Helpers>,
    filter: EntitiesFilter = {}
  ) {
    return new QueryBuilder<T>(model)
      .ids('id', filter.ids)
      .between('createdAt', filter.createdAt)
      .id('createdBy', filter.createdBy)
      .between('updatedAt', filter.updatedAt)
      .id('updatedBy', filter.updatedBy)
      .eq('isActive', filter.isActive)
    // TODO Hide mock entities in production
    // .visible('isMock', filter.isMock || false, phase)
  }

  /**
   * Creates a new instance of QueryBuilder for finding a specific entity.
   * @param [filter] Filter.
   * @returns QueryBuilder.
   */
  static entity<T extends Entity, Helpers = {}> (
    model: ModelType<T, Helpers>,
    filter: EntityFilter = {}
  ) {
    return new QueryBuilder<T>(model).id('id', filter.id)
  }

  // #endregion
}
