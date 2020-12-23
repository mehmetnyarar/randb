import { Network, Site, stringify } from '@app/logic'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useMemo } from 'react'
import { InfoRecord } from '~/components/info'
import { useTranslation } from '~/i18n'
import { CellList } from './cells'
import { NeDetails } from './ne'

interface Props {
  value: Site
}

/**
 * Site details.
 */
export const SiteDetails: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { onDeleteSite } = useContext(Network)

  const { id } = value
  const handleDelete = useCallback(() => {
    onDeleteSite(id, () => push('/dashboard'))
  }, [onDeleteSite, id, push])

  const data = useMemo<InfoRecord[]>(() => {
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

    return [
      { title: t('ne.bsc'), value: bsc?.name },
      { title: t('ne.rnc'), value: rnc?.name },
      { title: t('ne.tac'), value: tac?.name },
      { title: t('ne.lac'), value: lac?.name },
      { title: t('ne.ID'), value: ID },
      { title: t('ne.name'), value: name },
      { title: t('ne.location'), value: stringify.location(location) },
      { title: t('ne.cells.g2'), render: <CellList items={g2} /> },
      { title: t('ne.cells.g3'), render: <CellList items={g3} /> },
      { title: t('ne.cells.g4'), render: <CellList items={g4} /> },
      { title: t('ne.active'), value: t(stringify.yesNo(isActive)) as string },
      { title: t('ne.deactivated'), value: stringify.date(deactivatedAt) },
      { title: t('ne.created'), value: stringify.date(createdAt) },
      {
        title: t('ne.created.by'),
        value: stringify.personName(createdBy?.name)
      },
      { title: t('ne.updated'), value: stringify.date(updatedAt) },
      {
        title: t('ne.updated.by'),
        value: stringify.personName(updatedBy?.name)
      },
      { title: t('ne.id'), value: id }
    ]
  }, [t, value])

  return <NeDetails data={data} onDelete={handleDelete} />
}
