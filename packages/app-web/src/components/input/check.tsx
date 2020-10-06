import { SelectState } from '@app/logic'
import React, { HTMLProps, useEffect, useRef } from 'react'

export type CheckInputType = 'checkbox' | 'radio'

interface Props extends HTMLProps<HTMLInputElement> {
  type?: CheckInputType
  value: SelectState
  icon?: any
  label: string
  labelFor: string
  padding?: number
  hidden?: boolean
}

/**
 * Checkbox or radio input.
 * @param props Props.
 * @see https://www.peanutbutterjavascript.com/how-to-build-an-indeterminate-checkbox-in-react/
 */
export const Check: React.FC<Props> = props => {
  const {
    type = 'checkbox',
    icon,
    label,
    labelFor,
    padding = 0,
    hidden,
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
      <div className='check-input'>
        <input ref={ref} type={type} id={labelFor} {...inputProps} />
        {icon}
        <label htmlFor={labelFor}>{label}</label>
      </div>

      <style jsx>
        {`
          .check-input {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            cursor: pointer;
            padding-left: ${4 + padding}px;
            font-size: 12px;
          }
          .check-input input {
            display: ${hidden ? 'none' : 'unset'};
          }
          .check-input label {
            margin-left: 8px;
          }
        `}
      </style>
    </>
  )
}
