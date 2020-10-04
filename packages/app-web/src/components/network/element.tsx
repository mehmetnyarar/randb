import { getNeLevel, Ne } from '@app/logic'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import {
  RiBaseStationLine,
  RiSignalWifiLine,
  RiStackLine
} from 'react-icons/ri'
import { CheckBox, CheckBoxState } from '../input'

interface Props {
  element: Ne
  onSelect: (element: Ne) => void
  current?: Ne
}

/**
 * Network element.
 */
export const ElementView: React.FC<Props> = props => {
  const { element, onSelect, current } = props
  const { id, name, type, children, isVisible } = element

  const level = useMemo(() => getNeLevel(type), [type])
  const [state, setState] = useState(CheckBoxState.UNCHECKED)
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked
      if (checked) onSelect(element)
      setState(checked ? CheckBoxState.CHECKED : CheckBoxState.UNCHECKED)
    },
    [element, onSelect]
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
  const className = useMemo(() => (isVisible ? 'ne-item' : 'ne-item hidden'), [
    isVisible
  ])
  const showChildren = useMemo(() => {
    return children && children.length > 0 && state !== CheckBoxState.UNCHECKED
  }, [state, children])

  return (
    <>
      <li className={className}>
        <CheckBox
          icon={<Icon />}
          label={label}
          labelFor={name}
          value={state}
          onChange={onChange}
          padding={level * 8}
          isSelected={current?.id === id}
          isInputHidden
        />
        {showChildren ? (
          <ul className='ne-list'>
            {children.map((e, i) => (
              <ElementView
                key={i}
                element={e}
                onSelect={onSelect}
                current={current}
              />
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

          .ne-item-name {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
          .ne-item-name span {
            margin-left: 8px;
          }
        `}
      </style>
    </>
  )
}
