import { format } from 'date-fns'
import { writeFile } from 'fs-extra'
import { join } from 'path'
import { LOGS_DIR } from '~/config'
import { LogLevel } from '~/logger'
import { EntityType, EventType, NetworkType } from '~/models'
import { NetworkElementReport, NetworkImportReport, NetworkLog } from './type'

const SUCCESS_LEVEL = [
  EventType.ENTITY_CREATE,
  EventType.ENTITY_UPDATE,
  EventType.IMPORT_ADD
]

/**
 * Network reporter.
 */
export class NetworkReporter {
  // #region Properties

  /**
   * Network.
   */
  nw: NetworkType

  /**
   * Logs.
   */
  logs: NetworkLog[]

  /**
   * New items.
   */
  created: string[]

  // #endregion

  // #region Constructor

  /**
   * Initializes a new instance of NetworkReporter.
   * @param network Network type.
   * @param [log] Initial log.
   */
  constructor (network: NetworkType, log?: NetworkLog) {
    this.nw = network
    this.logs = log ? [log] : []
    this.created = []
  }

  // #endregion

  // #region Methods

  /**
   * Reports the event if the conditions are met.
   * @param log Network log.
   * @param entity Entity.
   */
  public report (log: Partial<NetworkLog>) {
    if (!log.event) return

    let level: LogLevel = 'info'
    if (SUCCESS_LEVEL.includes(log.event)) level = 'success'

    if (log.event === EventType.ENTITY_CREATE && log.id) {
      this.created.push(log.id)
    } else if (log.event === EventType.ENTITY_UPDATE && log.id) {
      if (this.created.includes(log.id)) return
    }

    this.logs.push({
      date: new Date(),
      level: log.level || level,
      event: log.event || EventType.SYS_INFO,
      network: this.nw,
      ...log
    })
  }

  /**
   * Filters logs with specific event and entity.
   * @param event Event type.
   * @param type Entity type.
   * @returns Filtered logs.
   */
  public getLogs (event: EventType, type: EntityType) {
    return this.logs.filter(log => log.event === event && log.entity === type)
  }

  /**
   * Creates NE report.
   * @param event Event type.
   * @returns NE report.
   */
  public getNeReport (event: EventType) {
    const report: NetworkElementReport = {
      bsc: this.getLogs(event, EntityType.BSC).length,
      rnc: this.getLogs(event, EntityType.RNC).length,
      tac: this.getLogs(event, EntityType.TAC).length,
      lac: this.getLogs(event, EntityType.LAC).length,
      site: this.getLogs(event, EntityType.SITE).length,
      cell: this.getLogs(event, EntityType.CELL).length,
      antenna: this.getLogs(event, EntityType.ANTENNA).length
    }

    return report
  }

  /**
   * Creates a network import report.
   * @returns Import report.
   */
  public async getNetworkImportReport (saveToFile?: boolean) {
    const report: NetworkImportReport = {
      logs: this.logs,
      created: this.getNeReport(EventType.ENTITY_CREATE),
      updated: this.getNeReport(EventType.ENTITY_UPDATE)
    }

    if (saveToFile) {
      const date = format(new Date(), 'ddMMyyyy-HHmm')
      const path = join(LOGS_DIR, `network-import_${this.nw}_${date}.log`)

      try {
        await writeFile(path, JSON.stringify(report, null, 2), {
          encoding: 'utf-8'
        })
      } catch (error) {
        // istanbul ignore next
        console.debug(
          'An error occured while storing the network import log!',
          {
            path,
            error
          }
        )
      }
    }

    return report
  }

  // #endregion

  // #region Static Methods

  /**
   * Reports XLSX errors.
   * @param type Network type.
   * @param message Error message.
   * @returns Network import reporter.
   */
  static reportXlsxError (type: NetworkType, message: string) {
    return new NetworkReporter(type, {
      date: new Date(),
      level: 'error',
      event: EventType.SYS_ERROR,
      invalid: message
    })
  }

  // #endregion
}
