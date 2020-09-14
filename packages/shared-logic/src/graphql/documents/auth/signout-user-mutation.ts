import gql from 'graphql-tag'

export const mutation = gql`
  mutation SignoutUser($data: SignoutUserInput!) {
    signoutUser(data: $data)
  }
`
