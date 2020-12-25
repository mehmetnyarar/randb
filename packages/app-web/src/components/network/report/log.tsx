import { DateFormat, EventType, NetworkLog, stringify } from '@app/logic'
import { ColorPalette, Theme } from '@app/ui'
import { toLower } from 'lodash'
import React, { useContext, useMemo } from 'react'
import {
  RiAddLine,
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiErrorWarningLine,
  RiInformationLine
} from 'react-icons/ri'
import { useTranslation } from '~/i18n'
import { EntityLink } from '../link'

interface Props {
  value: NetworkLog
}

/**
 * Returns an icon based on a log level.
 * @param event Event type.
 * @param level Log level.
 * @param theme Color palette.
 * @returns Icon.
 */
const getIcon = ({ event, level }: NetworkLog, theme: ColorPalette) => {
  if (event === EventType.IMPORT_ADD) {
    return <RiAddLine fill={theme['text-success-color']} />
  }

  switch (level) {
    case 'success':
      return <RiCheckDoubleLine fill={theme['text-success-color']} />
    case 'warn':
      return <RiErrorWarningLine fill={theme['text-warning-color']} />
    default:
      return <RiInformationLine fill={theme['text-info-color']} />
  }
}

/**
 * Network log.
 */
export const Log: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)

  const event = useMemo(() => {
    const { event: e, entity, targetEntity, index } = value
    switch (e) {
      case EventType.ENTITY_CREATE:
      case EventType.ENTITY_UPDATE:
      case EventType.ENTITY_DELETE:
        return t(`event.${e}`, { entity: t(`ne.${toLower(entity)}`) })
      case EventType.IMPORT_ADD:
        return t(`event.${e}`, {
          entity: t(`ne.${toLower(entity)}`),
          target: t(`ne.${toLower(targetEntity)}`)
        })
      case EventType.IMPORT_ERROR:
        return t('error.index', { index })
      default:
        return t(`event.${e}`)
    }
  }, [t, value])
  const details = useMemo(() => {
    const {
      event,
      entity,
      name,
      targetEntity,
      targetName,
      invalid,
      missing
    } = value

    switch (event) {
      case EventType.ENTITY_CREATE:
      case EventType.ENTITY_UPDATE:
        return (
          <td>
            <EntityLink type={entity} name={name} />
          </td>
        )

      case EventType.IMPORT_ADD:
        return (
          <td>
            <EntityLink type={entity} name={name} />
            <RiArrowRightLine className='add-arrow' />
            <EntityLink type={targetEntity} name={targetName} />
          </td>
        )
      case EventType.IMPORT_ERROR:
        return (
          <td>
            {invalid && (
              <>
                <p>{t('error.invalid')}</p>
                <ul>
                  {invalid.split(',').map(field => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </>
            )}
            {missing && (
              <>
                <p>{t('error.invalid')}</p>
                <ul>
                  {invalid.split(',').map(field => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </>
            )}
          </td>
        )
      default:
        return <td />
    }
  }, [t, value])

  return (
    <>
      <tr>
        <td>{stringify.date(value.date, DateFormat.dmyhms)}</td>
        <td>{getIcon(value, palette)}</td>
        <td>{event}</td>
        {details}
      </tr>

      <style jsx>
        {`
          .add {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .add-arrow {
            margin: 0 16px;
          }

          .error {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
        `}
      </style>
    </>
  )
}
