import { toString } from 'lodash'
import { Repository } from '~/db'
import { Logger } from '~/logger'
import {
  AntennaModel,
  CellModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL3G,
  DEFAULT_LAC,
  DEFAULT_RNC,
  DEFAULT_SITE,
  exists,
  LacModel,
  RncModel,
  SiteModel,
  to3GBand,
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
  src: 'modules/fs/import/excel/g3',
  file: 'info',
  memory: 'debug'
})

/**
 * Imports 3G data from Excel.
 * @param path File path.
 * @param [user] User.
 * @param [sheetName] Sheet name.
 */
export const from = async (
  path: string,
  user?: EntityOrDocument<User>,
  sheetName?: string
) => {
  logger.info('IMPORT_START:3G')

  const data = sheet<Item>(path, sheetName)
  const rncs = new Repository(RncModel, DEFAULT_RNC)
  const lacs = new Repository(LacModel, DEFAULT_LAC)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(CellModel, DEFAULT_CELL3G)

  let index = 1
  for (const item of data) {
    const { isValid, missing, invalid } = validate(item, VALIDATION_RULES)

    if (isValid) {
      // #region data

      const rncId = toString(item['RNC ID'])
      const rncName = toString(item['RNC Name'])
      const lacValue = toString(item.LAC)
      const siteId = toString(item['Site ID'])
      const siteName = toString(item['Site Name'])
      const cellId = toString(item.CI)
      const cellName = toString(item['Cell Name'])
      const antennaType = toString(item['Antenna Type'])
      const location = toGeoPoint(
        toFloat(item.Longitude),
        toFloat(item.Latitude)
      )

      // #endregion

      // #region rnc

      const rnc = await rncs.upsertOne(
        { name: rncName },
        { name: rncName, ID: rncId },
        { createdBy: user?._id }
      )

      if (rnc.updatedAt) logger.success(`IMPORT_UPDATE:RNC=${rnc.name}`)
      else logger.success(`IMPORT_CREATE:RNC=${rnc.name}`)

      // #endregion

      // #region lac

      const lac = lacValue
        ? await lacs.upsertOne(
          { name: lacValue },
          { name: lacValue },
          { createdBy: user?._id }
        )
        : undefined

      if (lac) {
        if (lac.updatedAt) logger.success(`IMPORT_UPDATE:LAC=${lac.name}`)
        else logger.success(`IMPORT_CREATE:LAC=${lac.name}`)
      }

      // #endregion

      // #region site

      const site = await sites.upsertOne(
        { name: siteName },
        {
          rnc: rnc._id,
          lac: lac?._id,
          ID: siteId,
          name: siteName,
          location
        },
        { createdBy: user?._id }
      )

      if (site.updatedAt) logger.success(`IMPORT_UPDATE:SITE=${site.name}`)
      else logger.success(`IMPORT_CREATE:SITE=${site.name}`)

      if (!exists(site._id, rnc.children)) {
        rnc.children.push(site._id)
        await rnc.save()
        logger.success(`IMPORT_ADD:SITE=${site.name}>RNC=${rnc.name}`)
      }

      if (lac && !exists(site._id, lac.children)) {
        lac.children.push(site._id)
        await lac.save()
        logger.success(`IMPORT_ADD:SITE=${site.name}>LAC=${lac.name}`)
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
          rnc: rnc._id,
          lac: lac?._id,
          site: site._id,
          location,
          ID: cellId,
          name: cellName,
          sector: info.sector,
          antenna: antenna?._id,
          height: toFloat(item.Height),
          azimuth: toInt(item.Azimuth),
          mechanicalTilt: toFloat(item['Mechanical Downtilt']),
          electricalTilt: toFloat(item['Electrical Downtilt']),
          scenario: toScenario(item['Scenario（Indoor or Outdoor）']),
          isActive: item.Active || true,
          g3: {
            psc: toInt(item.PSC),
            band: to3GBand(item['Frequency Band']),
            arfcn: toInt(item.ARFCN),
            totalPower: toFloat(item['Total Power(dBm)']),
            pilotPower: toFloat(item['Pilot Power(dBm)'])
          }
        },
        { createdBy: user?._id }
      )

      if (cell.updatedAt) logger.success(`IMPORT_UPDATE:CELL=${cell.name}`)
      else logger.success(`IMPORT_CREATE:CELL=${cell.name}`)

      if (!exists(cell._id, site.children)) {
        site.g3.push(cell._id)
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

  logger.info('IMPORT_FINISH:3G')
  return logger.entries
}
