import React from 'react'
import { RiRefreshLine } from 'react-icons/ri'

interface Props {
  icon?: boolean
  spin?: boolean
  text?: string
}

/**
 * Loading.
 */
export const Loading: React.FC<Props> = ({ icon, spin, text }) => {
  return (
    <>
      <div className='loading'>
        {icon && <RiRefreshLine className={spin ? 'icon-spin' : undefined} />}
        {text && <span>{text}</span>}
      </div>

      <style jsx>
        {`
          .loading {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          .loading span {
            margin-left: 8px;
          }
        `}
      </style>
    </>
  )
}
