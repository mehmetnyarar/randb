import { SelectState } from '@app/logic'
import React, { HTMLProps, useEffect, useRef } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  value: SelectState
  icon?: any
  label: string
  labelFor: string
  padding?: number
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
    isInputHidden,
    value,
    ...inputProps
  } = props

  const ref = useRef<any>()
  useEffect(() => {
    ref.current.checked = value === SelectState.SELECTED
    ref.current.indeterminate = value === SelectState.INDETERMINATE
  }, [value])

  return (
    <>
      <div className='checkbox'>
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
