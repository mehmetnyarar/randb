import { Cell, Network, stringify } from '@app/logic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from '~/i18n'
import { DangerButton } from '../button'
import { InfoTable } from '../info'
import { InfoRecord } from '../info/types'

interface Props {
  value: Cell
}

/**
 * Cell details.
 */
export const CellDetails: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { onDeleteCell } = useContext(Network)

  const { id } = value
  const onDelete = useCallback(() => {
    onDeleteCell(id, () => push('/dashboard'))
  }, [onDeleteCell, id, push])

  const records = useMemo<InfoRecord[]>(() => {
    const items: InfoRecord[] = []
    const {
      id,
      bsc,
      rnc,
      tac,
      lac,
      site,
      ID,
      name,
      location,
      scenario,
      sector,
      antenna,
      height,
      azimuth,
      electricalTilt,
      mechanicalTilt,
      g2,
      g3,
      g4,
      isActive,
      deactivatedAt,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    } = value

    const params = g2 || g3 || g4
    items.push({ label: t('ne.bsc'), value: bsc?.name })
    items.push({ label: t('ne.rnc'), value: rnc?.name })
    items.push({ label: t('ne.tac'), value: tac?.name })
    items.push({ label: t('ne.lac'), value: lac?.name })
    items.push({
      label: t('ne.site'),
      cspan: 1,
      print: (
        <Link
          as={`/sites/${site.name}`}
          href={{ pathname: '/sites/[name]', query: { name: site.name } }}
        >
          <a>{site.name}</a>
        </Link>
      )
    })
    items.push({ label: t('ne.ID'), value: ID })
    items.push({ label: t('ne.name'), value: name })
    items.push({ label: t('ne.location'), value: stringify.location(location) })
    items.push({ label: t('ne.scenario'), value: scenario })
    items.push({ label: t('ne.sector'), value: sector })
    items.push({ label: t('ne.antenna'), value: antenna?.name })
    items.push({ label: t('ne.tilt.electric'), value: electricalTilt })
    items.push({ label: t('ne.tilt.mechanic'), value: mechanicalTilt })
    items.push({ label: t('ne.height'), value: height })
    items.push({ label: t('ne.azimuth'), value: azimuth })
    items.push({
      value: Object.keys(params).map(key => ({
        label: t(`ne.cell.param.${key}`),
        value: params[key]
      }))
    })
    items.push({
      label: t('ne.active'),
      value: t(stringify.yesNo(isActive)) as string
    })
    items.push({
      label: t('ne.deactivated'),
      value: stringify.date(deactivatedAt)
    })
    items.push({ label: t('ne.created'), value: stringify.date(createdAt) })
    items.push({
      label: t('ne.created.by'),
      value: stringify.personName(createdBy?.name)
    })
    items.push({ label: t('ne.updated'), value: stringify.date(updatedAt) })
    items.push({
      label: t('ne.updated.by'),
      value: stringify.personName(updatedBy?.name)
    })
    items.push({ label: t('ne.id'), value: id })

    return items
  }, [t, value])

  return (
    <>
      <article className='ne'>
        <InfoTable records={records} />
        <div className='ne-actions'>
          <DangerButton onClick={onDelete}>{t('delete')}</DangerButton>
        </div>
      </article>

      <style jsx>
        {`
          .ne-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
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
