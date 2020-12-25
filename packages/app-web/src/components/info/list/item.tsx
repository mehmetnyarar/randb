import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import React from 'react'
import { InfoRecord } from '../types'

interface Props extends InfoRecord {}

/**
 * Info item.
 */
export const Item: React.FC<Props> = props => {
  const { title, value, render } = props

  if (!render && isNil(value)) return null

  return (
    <>
      <div className='info-item'>
        <dt>{title}</dt>
        <dd>
          {render}
          {!isNil(value) &&
            (Array.isArray(value) ? (
              <dl>
                {value.map(item => (
                  <Item key={item.id} {...item} />
                ))}
              </dl>
            ) : isObject(value) ? (
              <Item {...value} />
            ) : (
              String(value)
            ))}
        </dd>
      </div>

      <style jsx>
        {`
          .info-item {
            margin: 8px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }
          dt {
            font-weight: bold;
          }
          dd {
            margin-top: 8px;
          }
          @media screen and (min-width: 600px) {
            .info-item {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: flex-start;
            }
            dt {
              min-width: 200px;
            }
            dd {
              margin-top: 0;
              margin-left: 16px;
            }
          }
        `}
      </style>
    </>
  )
}
