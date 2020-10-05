import gql from 'graphql-tag'

export const query = gql`
  query Cell($filter: CellFilter!) {
    cell(filter: $filter) {
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
      site {
        id
        name
      }
      scenario
      sector
      height
      azimuth
      antenna {
        id
        name
      }
      electricalTilt
      mechanicalTilt
      g2 {
        mcc
        mnc
        ncc
        bcc
        band
        bcch
        trxNumber
        trxPower
      }
      g3 {
        psc
        band
        arfcn
        totalPower
        pilotPower
      }
      g4 {
        pci
        band
        dlEarfcn
        dlBandwith
        channelIndex
        maxPower
        rsPower
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
