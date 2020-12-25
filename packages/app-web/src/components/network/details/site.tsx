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
      { id: 'bsc', title: t('ne.bsc'), value: bsc?.name },
      { id: 'rnc', title: t('ne.rnc'), value: rnc?.name },
      { id: 'tac', title: t('ne.tac'), value: tac?.name },
      { id: 'lac', title: t('ne.lac'), value: lac?.name },
      { id: 'neId', title: t('ne.ID'), value: ID },
      { id: 'name', title: t('ne.name'), value: name },
      {
        id: 'location',
        title: t('ne.location'),
        value: stringify.location(location)
      },
      {
        id: 'cells2g',
        title: t('ne.cells.g2'),
        render: <CellList items={g2} />
      },
      {
        id: 'cells3g',
        title: t('ne.cells.g3'),
        render: <CellList items={g3} />
      },
      {
        id: 'cells4g',
        title: t('ne.cells.g4'),
        render: <CellList items={g4} />
      },
      {
        id: 'active',
        title: t('ne.active'),
        value: t(stringify.yesNo(isActive)) as string
      },
      {
        id: 'deactivatedAt',
        title: t('ne.deactivated'),
        value: stringify.date(deactivatedAt)
      },
      {
        id: 'createdAt',
        title: t('ne.created'),
        value: stringify.date(createdAt)
      },
      {
        id: 'createdBy',
        title: t('ne.created.by'),
        value: stringify.personName(createdBy?.name)
      },
      {
        id: 'updatedAt',
        title: t('ne.updated'),
        value: stringify.date(updatedAt)
      },
      {
        id: 'updatedBy',
        title: t('ne.updated.by'),
        value: stringify.personName(updatedBy?.name)
      },
      { id: 'ref', title: t('ne.id'), value: id }
    ]
  }, [t, value])

  return <NeDetails data={data} onDelete={handleDelete} />
}
