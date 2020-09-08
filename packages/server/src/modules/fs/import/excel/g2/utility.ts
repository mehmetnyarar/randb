import { toString } from 'lodash'
import { Repository } from '~/db'
import { Logger } from '~/logger'
import {
  AntennaModel,
  BscModel,
  Cell2GBand,
  Cell2GModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL2G,
  DEFAULT_PARENT,
  DEFAULT_SITE,
  GeometryType,
  GeoPoint,
  LacModel,
  Scenario,
  SiteModel,
  User
} from '~/models'
import { EntityOrDocument } from '~/types'
import { toFloat, toInt } from '~/utility'
import { getCellNameInfo, validate } from '../../utility'
import { sheet } from '../import'
import { CELL_NAME_RULES, VALIDATION_RULES } from './const'
import { Item } from './types'

const logger = Logger.create({
  src: 'modules/fs/import/excel/g2',
  file: 'info'
})

/**
 * Imports 2G data from Excel.
 * @param path File path.
 * @param [user] User.
 * @param [sheetName] Sheet name.
 */
export const from = async (
  path: string,
  user?: EntityOrDocument<User>,
  sheetName?: string
) => {
  logger.info('Start')

  const data = sheet<Item>(path, sheetName)
  const bscs = new Repository(BscModel, DEFAULT_PARENT)
  const lacs = new Repository(LacModel, DEFAULT_PARENT)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(Cell2GModel, DEFAULT_CELL2G)

  let index = 1
  for (const item of data) {
    const { isValid, missing, invalid } = validate(item, VALIDATION_RULES)

    if (isValid) {
      // #region data

      const bscId = toString(item['BSC ID'])
      const bscName = toString(item['BSC Name'])
      const lacValue = toString(item.LAC)
      const siteId = toString(item['Site ID'])
      const siteName = toString(item['Site Name'])
      const cellId = toString(item.CI)
      const cellName = toString(item['Cell Name'])
      const scenario = item['Scenario（Indoor or Outdoor）'] as Scenario
      const antennaType = toString(item['Antenna Type'])
      const location: GeoPoint = {
        type: GeometryType.Point,
        coordinates: [toFloat(item.Latitude), toFloat(item.Longitude)]
      }

      // #endregion

      // #region bsc

      const bsc = await bscs.upsertOne(
        { name: bscName },
        { name: bscName, ID: bscId },
        { createdBy: user?._id }
      )

      if (!bsc.updatedAt) {
        logger.success(`bsc: ${bsc.name}`)
      }

      // #endregion

      // #region lac

      const lac = lacValue
        ? await lacs.upsertOne(
          { name: lacValue },
          { name: lacValue },
          { createdBy: user?._id }
        )
        : undefined

      if (lac && !lac.updatedAt) {
        logger.success(`lac: ${lac.name}`)
      }

      // #endregion

      // #region site

      const site = await sites.upsertOne(
        { name: siteName },
        {
          bsc: bsc._id,
          lac: lac?._id,
          ID: siteId,
          name: siteName,
          location
        },
        { createdBy: user?._id }
      )

      if (!site.updatedAt) {
        bsc.sites.push(site._id)
        await bsc.save()

        if (lac) {
          lac.sites.push(site._id)
          await lac.save()
        }

        logger.success(`site: ${site.name}`)
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

      if (antenna && !antenna.updatedAt) {
        logger.success(`antenna: ${antenna.name}`)
      }

      // #endregion

      // #region cell

      const info = getCellNameInfo(cellName, CELL_NAME_RULES)
      const cell = await cells.upsertOne(
        { ID: cellId, name: cellName },
        {
          bsc: bsc._id,
          lac: lac?._id,
          site: site._id,
          sector: info.sector,
          ID: cellId,
          name: cellName,
          antenna: antenna?._id,
          height: toFloat(item.Height),
          azimuth: toInt(item.Azimuth),
          mechanicalTilt: toFloat(item['Mechanical Downtilt']),
          electricalTilt: toFloat(item['Electrical Downtilt']),
          mcc: toInt(item.MCC),
          mnc: toInt(item.MNC),
          ncc: toInt(item.NCC),
          bcc: toInt(item.BCC),
          band: toString(item['Frequency Band']) as Cell2GBand,
          bcch: toInt(item.BCCH),
          trxNumber: toInt(item['TRX Number']),
          trxPower: toFloat(item['TRX Power(dBm']),
          scenario: scenario || Scenario.OUTDOOR
        },
        { createdBy: user?._id }
      )

      if (!cell.updatedAt) {
        site.cells2g.push(cell._id)
        await site.save()

        logger.success(`cell: ${cell.name}`)
      }

      // #endregion
    } else {
      if (missing) logger.warn(`missing values at ${index}: ${missing}`)
      if (invalid) logger.warn(`invalid values at ${index}: ${invalid}`)
    }

    index += 1
  }

  logger.info('Done')
}
