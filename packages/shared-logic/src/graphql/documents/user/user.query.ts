import gql from 'graphql-tag'

export const query = gql`
  query User($filter: UserFilter!) {
    user(filter: $filter) {
      id
      username
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
      gender
      birthday
      roles
      createdAt
      createdBy {
        id
        name {
          first
          last
        }
      }
      updatedAt
      updatedBy {
        id
        name {
          first
          last
        }
      }
      isMock
      isActive
      deactivatedAt
    }
  }
`
