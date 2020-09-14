import gql from 'graphql-tag'

export const query = gql`
  query CurrentUser {
    currentUser {
      id
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
