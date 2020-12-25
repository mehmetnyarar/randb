import { ElementType, Ne, Network } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, { ChangeEvent, useCallback, useContext, useMemo } from 'react'
import {
  RiBaseStationLine,
  RiInformationFill,
  RiSignalWifiLine,
  RiStackLine
} from 'react-icons/ri'
import { AnchorLink } from '~/components/button'
import { Check } from '~/components/input'

interface Props {
  element: Ne
}

/**
 * Network element.
 */
export const ElementView: React.FC<Props> = ({ element }) => {
  const {
    level,
    title,
    name,
    type,
    children,
    state,
    isCurrent,
    isVisible,
    areChildrenVisible
  } = element

  const { palette } = useContext(Theme)
  const { onSelectItem } = useContext(Network)

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSelectItem(element, event.target.checked)
    },
    [element, onSelectItem]
  )

  const Icon = useMemo(() => {
    switch (level) {
      case 2:
        return RiSignalWifiLine
      case 1:
        return RiBaseStationLine
      default:
        return RiStackLine
    }
  }, [level])

  const route = useMemo(() => {
    switch (type) {
      case ElementType.CELL:
        return '/cells'
      case ElementType.SITE:
        return '/sites'
      default:
        return ''
    }
  }, [type])

  return (
    <>
      <li className={isVisible ? 'ne-item' : 'ne-item hidden'}>
        <div className={isCurrent ? 'ne selected' : 'ne'}>
          <Check
            icon={<Icon />}
            label={title}
            labelFor={name}
            value={state}
            onChange={onChange}
            padding={level * 8}
            hidden={false}
          />
          {level > 0 && (
            <div className='ne-tools'>
              <Link
                passHref
                href={{ pathname: `${route}/[name]'`, query: { name } }}
                as={`${route}/${name}`}
              >
                <AnchorLink
                  onClick={() => {
                    onSelectItem(element)
                  }}
                >
                  <RiInformationFill size={12} />
                </AnchorLink>
              </Link>
            </div>
          )}
        </div>

        {areChildrenVisible ? (
          <ul className='ne-list'>
            {children.map(e => (
              <ElementView key={e.id} element={e} />
            ))}
          </ul>
        ) : null}
      </li>
      <style jsx>
        {`
          .ne-list {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .ne-item {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
          .ne-item.hidden {
            display: none;
          }

          .ne {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .ne.selected {
            background: ${palette['color-primary-500']};
            color: ${palette['text-control-color']};
          }
          .ne.selected > a {
            background: ${palette['text-control-color']};
            color: ${palette['color-primary-500']};
          }

          .ne-tools {
            padding-right: 8px;
            font-size: 10px;
          }
        `}
      </style>
    </>
  )
}
