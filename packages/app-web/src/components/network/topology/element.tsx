import { ElementType, Ne, Network } from '@app/logic'
import { Theme } from '@app/ui'
import Link from 'next/link'
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import {
  RiBaseStationLine,
  RiInformationFill,
  RiSignalWifiLine,
  RiStackLine
} from 'react-icons/ri'
import { AnchorLink } from '~/components/button'
import { CheckBox, CheckBoxState } from '~/components/input'

interface Props {
  element: Ne
}

/**
 * Network element.
 */
export const ElementView: React.FC<Props> = ({ element }) => {
  const { level, id, name, type, children, isVisible } = element

  const { palette } = useContext(Theme)
  const { selectedItem, onSelectItem } = useContext(Network)

  const [state, setState] = useState(CheckBoxState.UNCHECKED)
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked
      if (checked) onSelectItem(element)
      setState(checked ? CheckBoxState.CHECKED : CheckBoxState.UNCHECKED)
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

  const label = useMemo(() => {
    return children && children.length ? `${name} (${children.length})` : name
  }, [name, children])

  const selectedId = selectedItem?.id
  const isSelected = useMemo(() => id === selectedId, [id, selectedId])

  const showChildren = useMemo(() => {
    return children && children.length > 0 && state !== CheckBoxState.UNCHECKED
  }, [state, children])

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
        <div className={isSelected ? 'ne selected' : 'ne'}>
          <CheckBox
            icon={<Icon />}
            label={label}
            labelFor={name}
            value={state}
            onChange={onChange}
            padding={level * 8}
            isInputHidden
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

        {showChildren ? (
          <ul className='ne-list'>
            {children.map((e, i) => (
              <ElementView key={i} element={e} />
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
