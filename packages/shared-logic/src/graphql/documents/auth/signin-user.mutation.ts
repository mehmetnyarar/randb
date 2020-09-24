import gql from 'graphql-tag'

export const mutation = gql`
  mutation SigninUser($data: SigninUserInput!) {
    signinUser(data: $data) {
      id
      name {
        first
        last
      }
      roles
      accessToken {
        name
        value
        expires
      }
      refreshToken {
        name
        value
        expires
      }
    }
  }
`
