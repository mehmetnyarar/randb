import gql from 'graphql-tag'

export const mutation = gql`
  mutation UpsertUser($data: UpsertUserInput!) {
    upsertUser(data: $data) {
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
