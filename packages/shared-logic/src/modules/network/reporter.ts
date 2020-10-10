import {
  EntityType,
  EventType,
  NetworkElementReport,
  NetworkImportReport,
  NetworkLog,
  NetworkType
} from '../../graphql'
import { Ne } from './types'

/**
 * Filters logs with specific event and entity.
 * @params logs Network logs.
 * @param event Event type.
 * @param type Entity type.
 * @returns Filtered logs.
 */
export const getNeLogs = (
  logs: NetworkLog[],
  event: EventType,
  type: EntityType
) => logs.filter(log => log.event === event && log.entity === type)

/**
 * Creates NE report.
 * @params logs Network logs.
 * @param event Event type.
 * @returns NE report.
 */
export const getNeReport = (
  logs: NetworkLog[],
  event: EventType
): NetworkElementReport => ({
  bsc: getNeLogs(logs, event, EntityType.BSC).length,
  rnc: getNeLogs(logs, event, EntityType.RNC).length,
  tac: getNeLogs(logs, event, EntityType.TAC).length,
  lac: getNeLogs(logs, event, EntityType.LAC).length,
  site: getNeLogs(logs, event, EntityType.SITE).length,
  cell: getNeLogs(logs, event, EntityType.CELL).length,
  antenna: getNeLogs(logs, event, EntityType.ANTENNA).length
})

/**
 * Determines whether an NE report is valid or not.
 * @param report NE report.
 * @returns True if the conditions are met.
 */
export const isValidNeReport = (report?: NetworkElementReport) => {
  if (!report) return false
  return Object.values(report).reduce((result, value) => {
    return result || Boolean(value)
  }, false)
}

/**
 * Creates a network import report.
 * @params logs Network logs.
 * @returns Import report.
 */
export const getNetworkImportReport = (
  logs: NetworkLog[]
): NetworkImportReport => {
  const created = getNeReport(logs, EventType.ENTITY_CREATE)
  const updated = getNeReport(logs, EventType.ENTITY_UPDATE)
  const deleted = getNeReport(logs, EventType.ENTITY_DELETE)

  return {
    logs,
    created: isValidNeReport(created) ? created : undefined,
    updated: isValidNeReport(updated) ? updated : undefined,
    deleted: isValidNeReport(deleted) ? deleted : undefined
  }
}

/**
 * Creates stats for a specific network.
 * @param network Network.
 * @param parents Parent NEs.
 * @returns NE stats.
 */
export const getNeStats = (network: NetworkType, parents: Ne[]) => {
  const stats: NetworkElementReport = {}

  switch (network) {
    case NetworkType.G2:
      stats.bsc = parents.length
      break
    case NetworkType.G3:
      stats.rnc = parents.length
      break
    case NetworkType.G4:
      stats.tac = parents.length
      break
  }

  const sitecell = parents.reduce(
    (total, parent) => {
      const sites = parent.children
      if (sites && sites.length) {
        const cells = sites.reduce((count, site) => {
          return count + (site.children?.length || 0)
        }, 0)

        const subtotal = {
          site: total.site + sites.length,
          cell: total.cell + cells
        }

        return subtotal
      }

      return total
    },
    { site: 0, cell: 0 }
  )

  stats.site = sitecell.site
  stats.cell = sitecell.cell

  return stats
}
