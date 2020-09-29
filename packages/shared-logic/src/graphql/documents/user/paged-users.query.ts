import gql from 'graphql-tag'

export const query = gql`
  query PagedUsers($filter: UsersFilter, $connection: ConnectionInput) {
    pagedUsers(filter: $filter, connection: $connection) {
      total
      edges {
        node {
          id
          name {
            first
            last
          }
          email
          phone {
            cc
            dc
            sn
          }
          roles
          isMock
          isActive
        }
        cursor
      }
      pages
      pageInfo {
        currentPage
        hasPreviousPage
        startCursor
        hasNextPage
        endCursor
      }
    }
  }
`
