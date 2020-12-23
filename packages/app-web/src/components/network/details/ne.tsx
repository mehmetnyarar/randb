import React from 'react'
import { DangerButton } from '~/components/button'
import { InfoList, InfoRecord } from '~/components/info'
import { useTranslation } from '~/i18n'

interface Props {
  data: InfoRecord[]
  onDelete: () => void | Promise<void>
}

/**
 * NE details.
 */
export const NeDetails: React.FC<Props> = props => {
  const { data, onDelete } = props
  const { t } = useTranslation()

  return (
    <>
      <section className='ne'>
        <InfoList data={data} className='ne-info' />
        <div className='ne-actions'>
          <DangerButton onClick={onDelete}>{t('delete')}</DangerButton>
        </div>
      </section>

      <style jsx>
        {`
          .ne {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .ne-list {
          }
          .ne-actions {
            margin-top: 32px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
