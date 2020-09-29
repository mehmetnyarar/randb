import React from 'react'

interface Props {
  label: string
  value?: string
  values?: string[]
}

/**
 * Info.
 * @param props Props.
 */
export const Info: React.FC<Props> = ({ label, value, values }) => {
  return (
    <>
      <div className='info'>
        <span className='info-label'>{label}</span>
        {value && <span className='info-value'>{value}</span>}
        {values && (
          <ul className='info-values'>
            {values.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>
        {`
          .info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
          .info-label {
            font-weight: bold;
          }
          .info-values {
            margin: 0;
            padding: 0;
            list-style: none;
          }
        `}
      </style>
    </>
  )
}
