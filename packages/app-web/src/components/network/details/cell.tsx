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
      { title: t('ne.bsc'), value: bsc?.name },
      { title: t('ne.rnc'), value: rnc?.name },
      { title: t('ne.tac'), value: tac?.name },
      { title: t('ne.lac'), value: lac?.name },
      {
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
      { title: t('ne.ID'), value: ID },
      { title: t('ne.name'), value: name },
      { title: t('ne.location'), value: stringify.location(location) },
      { title: t('ne.scenario'), value: scenario },
      { title: t('ne.sector'), value: sector },
      { title: t('ne.antenna'), value: antenna?.name },
      { title: t('ne.tilt.electric'), value: electricalTilt },
      { title: t('ne.tilt.mechanic'), value: mechanicalTilt },
      { title: t('ne.height'), value: height },
      { title: t('ne.azimuth'), value: azimuth },
      {
        title: t('ne.cell.params'),
        value: Object.keys(params).map(key => ({
          title: t(`ne.cell.param.${key}`),
          value: params[key]
        }))
      },
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
