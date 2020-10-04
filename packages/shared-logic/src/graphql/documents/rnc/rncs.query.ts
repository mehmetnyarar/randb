import gql from 'graphql-tag'

export const query = gql`
  query RNCs($filter: NetworkElementsFilter) {
    rncs(filter: $filter) {
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
