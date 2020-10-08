import { NetworkType } from '~/models'
import { CurrentUser } from '~/modules'
import * as g2 from './g2'
import * as g3 from './g3'
import * as g4 from './g4'

/**
 * Import networks from an excel file.
 * @param type Network type.
 * @param path File path.
 * @param [user] Current user.
 * @returns Event logs.
 */
export const importNetwork = async (
  type: NetworkType,
  path: string,
  user?: CurrentUser
) => {
  switch (type) {
    case NetworkType.G2:
      return g2.from(path, user)
    case NetworkType.G3:
      return g3.from(path, user)
    case NetworkType.G4:
      return g4.from(path, user)
    default:
      return undefined
  }
}

export { g2, g3, g4 }
