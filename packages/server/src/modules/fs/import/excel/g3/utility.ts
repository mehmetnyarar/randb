import { toString } from 'lodash'
import { Repository } from '~/db'
import { Logger } from '~/logger'
import {
  AntennaModel,
  Cell3GBand,
  Cell3GModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL3G,
  DEFAULT_PARENT,
  DEFAULT_SITE,
  GeometryType,
  GeoPoint,
  LacModel,
  RncModel,
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
  src: 'modules/fs/import/excel/g3',
  file: 'info'
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
  logger.info('Start')

  const data = sheet<Item>(path, sheetName)
  const rncs = new Repository(RncModel, DEFAULT_PARENT)
  const lacs = new Repository(LacModel, DEFAULT_PARENT)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(Cell3GModel, DEFAULT_CELL3G)

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
      const scenario = item['Scenario（Indoor or Outdoor）'] as Scenario
      const antennaType = toString(item['Antenna Type'])
      const location: GeoPoint = {
        type: GeometryType.Point,
        coordinates: [toFloat(item.Latitude), toFloat(item.Longitude)]
      }

      // #endregion

      // #region rnc

      const rnc = await rncs.upsertOne(
        { name: rncName },
        { name: rncName, ID: rncId },
        { createdBy: user?._id }
      )

      if (!rnc.updatedAt) {
        logger.success(`RNC: ${rnc.name}`)
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
          rnc: rnc._id,
          lac: lac?._id,
          ID: siteId,
          name: siteName,
          location
        },
        { createdBy: user?._id }
      )

      if (!site.updatedAt) {
        rnc.sites.push(site._id)
        await rnc.save()

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
          rnc: rnc._id,
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
          psc: toInt(item.PSC),
          band: toString(item['Frequency Band']) as Cell3GBand,
          arfcn: toInt(item.ARFCN),
          totalPower: toFloat(item['Total Power(dBm)']),
          pilotPower: toFloat(item['Pilot Power(dBm)']),
          scenario: scenario || Scenario.OUTDOOR,
          isActive: item.Active || true
        },
        { createdBy: user?._id }
      )

      if (!cell.updatedAt) {
        site.cells3g.push(cell._id)
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
