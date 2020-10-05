import gql from 'graphql-tag'

export const query = gql`
  query Site($filter: SiteFilter!) {
    site(filter: $filter) {
      id
      ID
      name
      type
      network
      location {
        x
        y
      }
      bsc {
        id
        name
      }
      rnc {
        id
        name
      }
      tac {
        id
        name
      }
      lac {
        id
        name
      }
      g2 {
        id
        name
        isActive
      }
      g3 {
        id
        name
        isActive
      }
      g4 {
        id
        name
        isActive
      }
      isActive
      deactivatedAt
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
    }
  }
`
