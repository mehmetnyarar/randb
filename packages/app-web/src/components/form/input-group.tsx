import React from 'react'

interface Props {}

/**
 * Input group.
 * @param props Props.
 */
export const InputGroup: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className='input-group' data-testid='input-group'>
        {children}
      </div>
      <style jsx>
        {`
          .input-group {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
