import { ClassType, Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { Entity } from '~/models'

/**
 * A filter to determine which portion of data to be returned.
 */
@InputType()
export class ConnectionInput {
  /**
   * Number of items to return.
   */
  @Field(() => Int, { nullable: true })
  first?: number

  /**
   * The cursor that points the last item in the dataset
   * to get next {first} items.
   */
  @Field(() => ID, { nullable: true })
  after?: string

  /**
   * The cursor that points to the first item in the dataset
   * to get previous {first} items.
   */
  @Field(() => ID, { nullable: true })
  before?: string

  /**
   * A specific page to return
   * (paged-style pagination).
   */
  @Field(() => Int, { nullable: true })
  page?: number
}

/**
 * Current status of the pagination.
 */
@ObjectType()
export class PageInfo {
  /**
   * Indicates the page number of the current dataset
   * (paged-style pagination).
   */
  @Field(() => Int)
  currentPage!: number

  /**
   * Indicates whether there is data available
   * before {startCursor} or not.
   */
  @Field()
  hasPreviousPage!: boolean

  /**
   * First item of the dataset.
   */
  @Field(() => ID)
  startCursor!: string

  /**
   * Indicates whether there is data available
   * after {endCursor} or not.
   */
  @Field()
  hasNextPage!: boolean

  /**
   * Last item of the dataset.
   */
  @Field(() => ID)
  endCursor!: string
}

/**
 * Pagination edge.
 */
export interface Edge<T extends Entity> {
  node: T
  cursor: string
}

/**
 * Returns edge type.
 * @param ItemType Entity.
 */
export function edge<T extends Entity> (ItemType: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType implements Edge<T> {
    /**
     * Item.
     */
    @Field(() => ItemType)
    node!: T

    /**
     * Item identifier.
     */
    @Field(() => ID)
    cursor!: string
  }

  return EdgeType
}

/**
 * Pagination response.
 */
export interface Response<T extends Entity> {
  total: number
  edges: Edge<T>[]
  pageInfo: PageInfo
  pages: number
}

/**
 * Returns response type.
 * @param EdgeType Edge.
 */
export function response<T extends Entity> (EdgeType: ClassType<Edge<T>>) {
  @ObjectType({ isAbstract: true })
  abstract class ResponseType implements Response<T> {
    /**
     * Number of all the items.
     */
    @Field(() => Int)
    total!: number

    /**
     * Items.
     */
    @Field(() => [EdgeType])
    edges!: Edge<T>[]

    /**
     * Pagination information.
     */
    @Field(() => PageInfo)
    pageInfo!: PageInfo

    /**
     * Number of pages
     * (paged-style pagination).
     */
    @Field(() => Int)
    pages!: number
  }

  return ResponseType
}
