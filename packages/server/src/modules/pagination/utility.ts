import { Entity } from '~/models'
import { ConnectionInput, Edge, Response } from './type'

/**
 * Returns the number of pages.
 * @param total Total number of records.
 * @param limit Number of items per page.
 */
export const getPages = (total: number, limit: number) => {
  const remain = total % limit
  const difference = total - remain
  const numberOfPages = difference / limit

  return remain > 0 ? numberOfPages + 1 : numberOfPages
}

/**
 * Returns paginated data.
 * @param data Initial data.
 * @param connection Pagination filter.
 */
export function paginate<T extends Entity> (
  data: T[],
  connection: ConnectionInput = { first: 10 }
): Response<T> {
  const total = data.length
  const limit = connection.first || 10
  const pages = getPages(total, limit)

  // Get the index of the first item
  let start = 0
  if (connection.page) {
    // Paged-style pagination
    start = (connection.page - 1) * limit
  } else if (connection.after) {
    // Cursor-style pagination (next)
    const idx = data.findIndex(item => item.id === connection.after)
    if (idx !== -1) start = idx + 1
  } else if (connection.before) {
    // Cursor-style pagination (previous)
    const idx = data.findIndex(item => item.id === connection.before)
    if (idx !== -1) start = idx - limit
  }

  const records = total - start
  const take = records < limit ? records : limit
  const end = start + take
  const dataset = data.slice(start, end)

  let startCursor = ''
  let endCursor = ''
  let edges: Edge<T>[] = []

  if (dataset.length) {
    startCursor = dataset[0].id
    endCursor = dataset[take - 1].id
    edges = dataset.map(item => ({
      cursor: item.id,
      node: item
    }))
  }

  const currentPage = start / limit + 1
  const hasPreviousPage = start > 0
  const hasNextPage = start + limit < total

  return {
    edges,
    pageInfo: {
      currentPage,
      hasPreviousPage,
      startCursor,
      hasNextPage,
      endCursor
    },
    pages,
    total
  }
}
