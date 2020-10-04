import React, { HTMLProps, useEffect, useRef } from 'react'

export enum CheckBoxState {
  CHECKED = 1,
  UNCHECKED = 0,
  INDETERMINATE = -1
}

interface Props extends HTMLProps<HTMLInputElement> {
  value: CheckBoxState
  icon?: any
  label: string
  labelFor: string
  padding?: number
  isSelected?: boolean
  isInputHidden?: boolean
}

/**
 * Checkbox.
 * @param props Props.
 * @see https://www.peanutbutterjavascript.com/how-to-build-an-indeterminate-checkbox-in-react/
 */
export const CheckBox: React.FC<Props> = props => {
  const {
    icon,
    label,
    labelFor,
    padding = 0,
    isSelected,
    isInputHidden,
    value,
    ...inputProps
  } = props

  const ref = useRef<any>()
  useEffect(() => {
    ref.current.checked = value === CheckBoxState.CHECKED
    ref.current.indeterminate = value === CheckBoxState.INDETERMINATE
  }, [value])

  return (
    <>
      <div className={isSelected ? 'checkbox selected' : 'checkbox'}>
        <input ref={ref} type='checkbox' id={labelFor} {...inputProps} />
        {icon}
        <label htmlFor={labelFor}>{label}</label>
      </div>

      <style jsx>
        {`
          .checkbox {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            padding-left: ${4 + padding}px;
            font-size: 12px;
          }
          .checkbox.selected {
            background: blue;
            color: white;
          }

          .checkbox input {
            display: ${isInputHidden ? 'none' : 'unset'};
          }
          .checkbox label {
            margin-left: 8px;
          }
        `}
      </style>
    </>
  )
}
