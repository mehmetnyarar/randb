import gql from 'graphql-tag'

export const query = gql`
  query CurrentUserWithTokens {
    currentUser {
      id
      name {
        first
        last
      }
      roles
      accessToken {
        value
        expires
      }
      refreshToken {
        value
        expires
      }
    }
  }
`
