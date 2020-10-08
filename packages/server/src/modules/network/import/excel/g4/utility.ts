import { toString } from 'lodash'
import { Repository } from '~/db'
import {
  AntennaModel,
  CellModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL4G,
  DEFAULT_SITE,
  DEFAULT_TAC,
  EntityType,
  EventType,
  exists,
  getId,
  NetworkType,
  SiteModel,
  TacModel,
  to4GBand,
  toGeoPoint,
  toScenario
} from '~/models'
import { CurrentUser, NetworkReporter, sheet } from '~/modules'
import { toFloat, toInt } from '~/utility'
import { getCellNameInfo, validate } from '../../utility'
import { CELL_NAME_RULES, VALIDATION_RULES } from './const'
import { Item } from './types'

/**
 * Imports 4G data from Excel.
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
    return NetworkReporter.reportXlsxError(NetworkType.G4, data)
  }

  const reporter = new NetworkReporter(NetworkType.G4)
  reporter.report({ event: EventType.IMPORT_START })

  const createdBy = getId(user?.id)
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
        { createdBy }
      )

      reporter.report({
        event: tac.event,
        entity: EntityType.TAC,
        name: tac.name,
        id: tac.id
      })

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
        { createdBy }
      )

      reporter.report({
        event: site.event,
        entity: EntityType.SITE,
        name: site.name,
        id: site.id
      })

      if (!exists(site._id, tac.children)) {
        tac.children.push(site._id)
        await tac.save()

        reporter.report({
          event: EventType.IMPORT_ADD,
          entity: EntityType.SITE,
          name: site.name,
          id: site.id,
          targetEntity: EntityType.TAC,
          targetName: tac.name,
          targetId: tac.id
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
        site.g4.push(cell._id)
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
