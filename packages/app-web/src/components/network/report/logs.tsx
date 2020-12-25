import { NetworkLog } from '@app/logic'
import React from 'react'
import { useTranslation } from '~/i18n'
import { Log } from './log'

interface Props {
  value: NetworkLog[]
}

/**
 * Network logs.
 */
export const Logs: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{t('date')}</th>
            <th>{t('level')}</th>
            <th>{t('event')}</th>
            <th>{t('details')}</th>
          </tr>
        </thead>
        <tbody>
          {value.map(log => (
            <Log key={log.id} value={log} />
          ))}
        </tbody>
      </table>
    </>
  )
}
