import gql from 'graphql-tag'

export const query = gql`
  query BSCs($filter: NetworkElementsFilter) {
    bscs(filter: $filter) {
      id
      name
      type
      network
      isActive
      children {
        id
        name
        type
        network
        isActive
        children {
          id
          name
          type
          network
          isActive
        }
      }
    }
  }
`
