import gql from 'graphql-tag'

export const mutation = gql`
  mutation DeleteSite($data: DeleteEntityInput!) {
    deleteSite(data: $data)
  }
`
