import { Site, stringify } from '@app/logic'
import React, { useMemo } from 'react'
import { useTranslation } from '~/i18n'
import { InfoTable } from '../info'
import { InfoRecord } from '../info/types'
import { CellList } from './cell-list'

interface Props {
  value: Site
}

/**
 * Site details.
 */
export const SiteDetails: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()
  const records = useMemo<InfoRecord[]>(() => {
    const items: InfoRecord[] = []
    const {
      id,
      bsc,
      rnc,
      tac,
      lac,
      ID,
      name,
      location,
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

    items.push({ label: t('ne.bsc'), value: bsc?.name })
    items.push({ label: t('ne.rnc'), value: rnc?.name })
    items.push({ label: t('ne.tac'), value: tac?.name })
    items.push({ label: t('ne.lac'), value: lac?.name })
    items.push({ label: t('ne.ID'), value: ID })
    items.push({ label: t('ne.name'), value: name })
    items.push({ label: t('ne.location'), value: stringify.location(location) })
    items.push({
      label: t('ne.cells.g2'),
      cspan: 2,
      print: <CellList items={g2} />
    })
    items.push({
      label: t('ne.cells.g3'),
      cspan: 2,
      print: <CellList items={g3} />
    })
    items.push({
      label: t('ne.cells.g4'),
      cspan: 2,
      print: <CellList items={g4} />
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
      <article className='site-info'>
        <InfoTable records={records} />
      </article>
    </>
  )
}
