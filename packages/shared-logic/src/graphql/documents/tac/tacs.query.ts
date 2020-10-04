import gql from 'graphql-tag'

export const query = gql`
  query TACs($filter: NetworkElementsFilter) {
    tacs(filter: $filter) {
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
