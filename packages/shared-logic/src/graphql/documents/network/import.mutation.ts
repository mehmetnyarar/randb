import gql from 'graphql-tag'

export const mutation = gql`
  mutation ImportNetwork($data: NetworkImportInput!, $options: FileOptions!) {
    importNetwork(data: $data, options: $options) {
      date
      level
      event
      network
      entity
      name
      id
      targetEntity
      targetName
      targetId
      index
      invalid
      missing
    }
  }
`
