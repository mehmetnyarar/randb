import {
  EntityType,
  EventType,
  NetworkElementReport,
  NetworkImportReport,
  NetworkLog
} from '../../graphql'

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
