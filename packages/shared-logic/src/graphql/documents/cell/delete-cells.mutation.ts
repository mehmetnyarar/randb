import gql from 'graphql-tag'

export const mutation = gql`
  mutation DeleteCells($data: DeleteEntitiesInput!) {
    deleteCells(data: $data)
  }
`