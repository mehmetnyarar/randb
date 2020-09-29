import gql from 'graphql-tag'

export const query = gql`
  query Users($filter: UsersFilter) {
    users(filter: $filter) {
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
  }
`
