import { toString } from 'lodash'
import { Repository } from '~/db'
import { Logger } from '~/logger'
import {
  AntennaModel,
  CellModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL4G,
  DEFAULT_SITE,
  DEFAULT_TAC,
  exists,
  SiteModel,
  TacModel,
  to4GBand,
  toGeoPoint,
  toScenario,
  User
} from '~/models'
import { EntityOrDocument } from '~/types'
import { toFloat, toInt } from '~/utility'
import { getCellNameInfo, validate } from '../../utility'
import { sheet } from '../import'
import { CELL_NAME_RULES, VALIDATION_RULES } from './const'
import { Item } from './types'

// Log guide
// : what
// = value
// > to
// @ at
const logger = Logger.create({
  src: 'modules/fs/import/excel/g4',
  file: 'info',
  memory: 'debug'
})

/**
 * Imports 4G data from Excel.
 * @param path File path.
 * @param [user] User.
 * @param [sheetName] Sheet name.
 */
export const from = async (
  path: string,
  user?: EntityOrDocument<User>,
  sheetName?: string
) => {
  logger.info('IMPORT_START:4G')

  const data = sheet<Item>(path, sheetName)
  const tacs = new Repository(TacModel, DEFAULT_TAC)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(CellModel, DEFAULT_CELL4G)

  let index = 1
  for (const item of data) {
    const { isValid, missing, invalid } = validate(item, VALIDATION_RULES)

    if (isValid) {
      // #region data

      const tacValue = toString(item.TAC)
      const siteId = toString(item['Site ID'])
      const siteName = toString(item['Site Name'])
      const cellId = toString(item['Cell ID'])
      const cellName = toString(item['Cell Name'])
      const antennaType = toString(item['Antenna Type'])
      const location = toGeoPoint(
        toFloat(item.Longitude),
        toFloat(item.Latitude)
      )

      // #endregion

      // #region tac

      const tac = await tacs.upsertOne(
        { name: tacValue },
        { name: tacValue },
        { createdBy: user?._id }
      )

      if (tac.updatedAt) logger.success(`IMPORT_UPDATE:TAC=${tac.name}`)
      else logger.success(`IMPORT_CREATE:TAC=${tac.name}`)

      // #endregion

      // #region site

      const site = await sites.upsertOne(
        { name: siteName },
        {
          tac: tac._id,
          ID: siteId,
          name: siteName,
          location
        },
        { createdBy: user?._id }
      )

      if (site.updatedAt) logger.success(`IMPORT_UPDATE:SITE=${site.name}`)
      else logger.success(`IMPORT_CREATE:SITE=${site.name}`)

      if (!exists(site._id, tac.children)) {
        tac.children.push(site._id)
        await tac.save()
        logger.success(`IMPORT_ADD:SITE=${site.name}>TAC=${tac.name}`)
      }

      // #endregion

      // #region antenna

      const antenna = antennaType
        ? await antennas.upsertOne(
          { name: antennaType },
          { name: antennaType },
          { createdBy: user?._id }
        )
        : undefined

      if (antenna) {
        if (antenna.updatedAt) {
          logger.success(`IMPORT_UPDATE:ANTENNA=${antenna.name}`)
        } else logger.success(`IMPORT_CREATE:ANTENNA=${antenna.name}`)
      }

      // #endregion

      // #region cell

      const info = getCellNameInfo(cellName, CELL_NAME_RULES)
      const cell = await cells.upsertOne(
        { ID: cellId, name: cellName },
        {
          tac: tac._id,
          site: site._id,
          location,
          sector: info.sector,
          ID: cellId,
          name: cellName,
          antenna: antenna?._id,
          height: toFloat(item.Height),
          azimuth: toInt(item.Azimuth),
          mechanicalTilt: toFloat(item['Mechanical Downtilt']),
          electricalTilt: toFloat(item['Electrical Downtilt']),
          scenario: toScenario(item.Scenario),
          isActive: item.Active || true,
          g4: {
            pci: toInt(item.PCI),
            band: to4GBand(item['Frequency Band']),
            dlEarfcn: toInt(item.DlEarfcn),
            dlBandwith: toInt(item['DlBandwidth(MHz)']),
            channelIndex: toInt(item['Channel Index']),
            maxPower: toFloat(item['Max Power(dBm)']),
            rsPower: toFloat(item['RS Power(dBm)'])
          }
        },
        { createdBy: user?._id }
      )

      if (cell.updatedAt) logger.success(`IMPORT_UPDATE:CELL=${cell.name}`)
      else logger.success(`IMPORT_CREATE:CELL=${cell.name}`)

      if (!exists(cell._id, site.children)) {
        site.g4.push(cell._id)
        site.children.push(cell._id)
        await site.save()
        logger.success(`IMPORT_ADD:CELL=${cell.name}>SITE=${site.name}`)
      }

      // #endregion
    } else {
      if (missing) logger.warn(`IMPORT_ERROR_MISSING@${index}=${missing}`)
      if (invalid) logger.warn(`IMPORT_ERROR_INVALID@${index}=${invalid}`)
    }

    index += 1
  }

  logger.info('IMPORT_FINISH:4G')
  return logger.entries
}
