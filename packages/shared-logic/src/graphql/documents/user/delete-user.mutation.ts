import gql from 'graphql-tag'

export const mutation = gql`
  mutation DeleteUser($data: DeleteUserInput!) {
    deleteUser(data: $data)
  }
`
