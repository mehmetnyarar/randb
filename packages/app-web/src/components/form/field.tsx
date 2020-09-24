import React from 'react'

interface Props {}

/**
 * Form field.
 * @param props Props.
 */
export const Field: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className='field' data-testid='field'>
        {children}
      </div>
      <style jsx>
        {`
          .field {
            margin: 8px 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
          }
        `}
      </style>
    </>
  )
}
