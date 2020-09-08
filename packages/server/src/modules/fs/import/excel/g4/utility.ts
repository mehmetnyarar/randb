import { toString } from 'lodash'
import { Repository } from '~/db'
import { Logger } from '~/logger'
import {
  AntennaModel,
  Cell4GBand,
  Cell4GModel,
  DEFAULT_ANTENNA,
  DEFAULT_CELL4G,
  DEFAULT_PARENT,
  DEFAULT_SITE,
  GeometryType,
  GeoPoint,
  Scenario,
  SiteModel,
  TacModel,
  User
} from '~/models'
import { EntityOrDocument } from '~/types'
import { toFloat, toInt } from '~/utility'
import { getCellNameInfo, validate } from '../../utility'
import { sheet } from '../import'
import { CELL_NAME_RULES, VALIDATION_RULES } from './const'
import { Item } from './types'

const logger = Logger.create({
  src: 'modules/fs/import/excel/g4',
  file: 'info'
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
  logger.info('Start')

  const data = sheet<Item>(path, sheetName)
  const tacs = new Repository(TacModel, DEFAULT_PARENT)
  const antennas = new Repository(AntennaModel, DEFAULT_ANTENNA)
  const sites = new Repository(SiteModel, DEFAULT_SITE)
  const cells = new Repository(Cell4GModel, DEFAULT_CELL4G)

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
      const scenario = item.Scenario as Scenario
      const antennaType = toString(item['Antenna Type'])
      const location: GeoPoint = {
        type: GeometryType.Point,
        coordinates: [toFloat(item.Latitude), toFloat(item.Longitude)]
      }

      // #endregion

      // #region tac

      const tac = await tacs.upsertOne(
        { name: tacValue },
        { name: tacValue },
        { createdBy: user?._id }
      )

      if (tac && !tac.updatedAt) {
        logger.success(`tac: ${tac.name}`)
      }

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

      if (!site.updatedAt) {
        tac.sites.push(site._id)
        await tac.save()

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
          tac: tac._id,
          site: site._id,
          sector: info.sector,
          ID: cellId,
          name: cellName,
          antenna: antenna?._id,
          height: toFloat(item.Height),
          azimuth: toInt(item.Azimuth),
          mechanicalTilt: toFloat(item['Mechanical Downtilt']),
          electricalTilt: toFloat(item['Electrical Downtilt']),
          pci: toInt(item.PCI),
          band: toString(item['Frequency Band']) as Cell4GBand,
          dlEarfcn: toInt(item.DlEarfcn),
          dlBandwith: toInt(item['DlBandwidth(MHz)']),
          channelIndex: toInt(item['Channel Index']),
          maxPower: toFloat(item['Max Power(dBm)']),
          rsPower: toFloat(item['RS Power(dBm)']),
          scenario: scenario || Scenario.OUTDOOR,
          isActive: item.Active || true
        },
        { createdBy: user?._id }
      )

      if (!cell.updatedAt) {
        site.cells4g.push(cell._id)
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
