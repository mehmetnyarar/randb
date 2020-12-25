import { Cell, Network, stringify } from '@app/logic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useMemo } from 'react'
import { InfoRecord } from '~/components/info'
import { useTranslation } from '~/i18n'
import { NeDetails } from './ne'

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
  const handleDelete = useCallback(() => {
    onDeleteCell(id, () => push('/dashboard'))
  }, [onDeleteCell, id, push])

  const data = useMemo<InfoRecord[]>(() => {
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

    return [
      { id: 'bsc', title: t('ne.bsc'), value: bsc?.name },
      { id: 'rnc', title: t('ne.rnc'), value: rnc?.name },
      { id: 'tac', title: t('ne.tac'), value: tac?.name },
      { id: 'lac', title: t('ne.lac'), value: lac?.name },
      {
        id: 'site',
        title: t('ne.site'),
        render: (
          <Link
            as={`/sites/${site.name}`}
            href={{ pathname: '/sites/[name]', query: { name: site.name } }}
          >
            <a>{site.name}</a>
          </Link>
        )
      },
      { id: 'neId', title: t('ne.ID'), value: ID },
      { id: 'name', title: t('ne.name'), value: name },
      {
        id: 'location',
        title: t('ne.location'),
        value: stringify.location(location)
      },
      { id: 'scenario', title: t('ne.scenario'), value: scenario },
      { id: 'sector', title: t('ne.sector'), value: sector },
      { id: 'antenna', title: t('ne.antenna'), value: antenna?.name },
      {
        id: 'electricTilt',
        title: t('ne.tilt.electric'),
        value: electricalTilt
      },
      {
        id: 'mechanicTilt',
        title: t('ne.tilt.mechanic'),
        value: mechanicalTilt
      },
      { id: 'height', title: t('ne.height'), value: height },
      { id: 'azimuth', title: t('ne.azimuth'), value: azimuth },
      {
        id: 'params',
        title: t('ne.cell.params'),
        value: Object.keys(params).map(key => ({
          id: `param.${key}`,
          title: t(`ne.cell.param.${key}`),
          value: params[key]
        }))
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
