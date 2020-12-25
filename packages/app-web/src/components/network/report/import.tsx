import { NetworkImportReport } from '@app/logic'
import React from 'react'
import { InfoTable } from '~/components/info'
import { useTranslation } from '~/i18n'
import { Logs } from './logs'

interface Props {
  value: NetworkImportReport
}

/**
 * Network import report.
 * @param props Props.
 */
export const ImportReport: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()
  const { logs, ...summary } = value

  return (
    <>
      <section className='report-summary'>
        <header>
          <h3>{t('summary')}</h3>
        </header>
        <div className='summary-items'>
          {Object.keys(summary || {}).map(key => {
            const item = summary[key]
            return item ? (
              <InfoTable
                key={key}
                caption={t(`network.import.${key}`)}
                data={Object.keys(item).map(key => ({
                  id: key,
                  title: t(`ne.${key}`),
                  value: item[key]
                }))}
                className='mr-16'
              />
            ) : null
          })}
        </div>
      </section>
      <section className='report-logs'>
        <header>
          <h3>{t('logs')}</h3>
        </header>
        <Logs value={logs} />
      </section>

      <style jsx>
        {`
          .report-summary,
          .report-logs {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }

          .report-summary header,
          .report-logs header {
            margin: 16px 0;
          }

          .summary-items {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
          }
        `}
      </style>
    </>
  )
}
