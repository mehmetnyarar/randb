import { toString } from 'lodash'
import { Repository } from '~/db'
import {
  AntennaModel,
  BscModel,
  CellModel,
  DEFAULT_ANTENNA,
  DEFAULT_BSC,
  DEFAULT_CELL2G,
  DEFAULT_LAC,
  DEFAULT_SITE,
  EntityType,
  EventType,
  exists,
  getId,
  LacModel,
  NetworkType,
  SiteModel,
  to2GBand,
  toGeoPoint,
  toScenario
} from '~/models'
import { CurrentUser, NetworkReporter, sheet } from '~/modules'
import { toFloat, toInt } from '~/utility'
import { getCellNameInfo, validate } from '../../utility'
import { CELL_NAME_RULES, VALIDATION_RULES } from './const'
import { Item } from './types'

/**
 * Imports 2G data from Excel.
 * @param path File path.
 * @param [user] Current user.
 * @param [sheetName] Sheet name.
 */
export const from = async (
  path: string,
  user?: CurrentUser,
  sheetName?: string
) => {
  const data = sheet<Item>(path, sheetName)
  if (typeof data === 'string') {
    return NetworkReporter.reportXlsxError(NetworkType.G2, data)
  }

  const reporter = new NetworkReporter(NetworkType.G2)
  reporter.report({ event: EventType.IMPORT_START })

  const createdBy = getId(user?.id)
  const bscs = new Repository(BscModel, DEFAULT_BSC)
  const lacs = new Repository(LacModel, DEFAULT_LAC)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(CellModel, DEFAULT_CELL2G)

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
      const antennaType = toString(item['Antenna Type'])
      const location = toGeoPoint(
        toFloat(item.Longitude),
        toFloat(item.Latitude)
      )

      // #endregion

      // #region bsc

      const bsc = await bscs.upsertOne(
        { name: bscName },
        { name: bscName, ID: bscId },
        { createdBy }
      )

      reporter.report({
        event: bsc.event,
        entity: EntityType.BSC,
        name: bsc.name,
        id: bsc.id
      })

      // #endregion

      // #region lac

      const lac = lacValue
        ? await lacs.upsertOne(
          { name: lacValue },
          { name: lacValue },
          { createdBy }
        )
        : undefined

      if (lac) {
        reporter.report({
          event: lac.event,
          entity: EntityType.LAC,
          name: lac.name,
          id: lac.id
        })
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
        { createdBy }
      )

      reporter.report({
        event: site.event,
        entity: EntityType.SITE,
        name: site.name,
        id: site.id
      })

      if (!exists(site._id, bsc.children)) {
        bsc.children.push(site._id)
        await bsc.save()

        reporter.report({
          event: EventType.IMPORT_ADD,
          entity: EntityType.SITE,
          name: site.name,
          id: site.id,
          targetEntity: EntityType.BSC,
          targetName: bsc.name,
          targetId: bsc.id
        })
      }

      if (lac && !exists(site._id, lac.children)) {
        lac.children.push(site._id)
        await lac.save()

        reporter.report({
          event: EventType.IMPORT_ADD,
          entity: EntityType.SITE,
          name: site.name,
          id: site.id,
          targetEntity: EntityType.LAC,
          targetName: lac.name,
          targetId: lac.id
        })
      }

      // #endregion

      // #region antenna

      const antenna = antennaType
        ? await antennas.upsertOne(
          { name: antennaType },
          { name: antennaType },
          { createdBy }
        )
        : undefined

      if (antenna && antenna.event) {
        reporter.report({
          event: antenna.event,
          entity: EntityType.ANTENNA,
          name: antenna.name,
          id: antenna.id
        })
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
          isActive: true, // there is no field to import
          g2: {
            mcc: toInt(item.MCC),
            mnc: toInt(item.MNC),
            ncc: toInt(item.NCC),
            bcc: toInt(item.BCC),
            band: to2GBand(item['Frequency Band']),
            bcch: toInt(item.BCCH),
            trxNumber: toInt(item['TRX Number']),
            trxPower: toFloat(item['TRX Power(dBm'])
          }
        },
        { createdBy }
      )

      if (cell.event) {
        reporter.report({
          event: cell.event,
          entity: EntityType.CELL,
          name: cell.name,
          id: cell.id
        })
      }

      if (!exists(cell._id, site.children)) {
        site.g2.push(cell._id)
        site.children.push(cell._id)
        await site.save()

        reporter.report({
          event: EventType.IMPORT_ADD,
          entity: EntityType.CELL,
          name: cell.name,
          id: cell.id,
          targetEntity: EntityType.SITE,
          targetName: site.name,
          targetId: site.id
        })
      }

      // #endregion
    } else if (invalid || missing) {
      reporter.report({
        level: 'warn',
        event: EventType.IMPORT_ERROR,
        invalid,
        missing,
        index
      })
    }

    index += 1
  }

  reporter.report({ event: EventType.IMPORT_END })
  return reporter
}
