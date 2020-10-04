import { MockedResponse } from '@apollo/client/testing'
import { BSCsDocument, BSCsQuery, ElementType, NetworkType } from '@app/logic'

export const success: MockedResponse<BSCsQuery> = {
  request: {
    query: BSCsDocument
  },
  result: {
    data: {
      bscs: [
        {
          id: 'bsc-id',
          name: 'bsc-name',
          type: ElementType.BSC,
          network: NetworkType.G2,
          isActive: true,
          children: [
            {
              id: 'site-id',
              name: 'site-name',
              type: ElementType.SITE,
              network: null,
              isActive: true,
              children: [
                {
                  id: 'cell-id',
                  name: 'cell-name',
                  type: ElementType.CELL,
                  network: NetworkType.G2,
                  isActive: true
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
