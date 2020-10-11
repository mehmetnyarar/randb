import gql from 'graphql-tag'

export const mutation = gql`
  mutation DeleteCell($data: DeleteEntityInput!) {
    deleteCell(data: $data)
  }
`
