import { Theme } from '@app/ui'
import React, { ReactElement, useContext } from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Loading } from '../loading'

export interface ContentHeaderProps {
  icon?: ReactElement
  title?: string
  query?: string
  loading?: boolean
  actions?: ReactElement
}

export const ContentHeader: React.FC<ContentHeaderProps> = props => {
  const { icon, title, query, loading, actions } = props
  const { palette } = useContext(Theme)

  if (!title) return null

  return (
    <>
      <header className='content-header'>
        <nav role='navigation' className='content-nav'>
          <h2 className='page-title'>
            {icon}
            <span>{title}</span>
          </h2>
          <ul className='breadcrumb'>
            <li />
            {query && (
              <li>
                <RiArrowRightSLine />
                <span>{query}</span>
              </li>
            )}
          </ul>
          {loading && <Loading icon spin />}
        </nav>
        {actions}
      </header>

      <style jsx>
        {`
          .content-header,
          .content-nav,
          .page-title,
          .breadcrumb,
          .breadcrumb li {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          .content-header {
            height: 50px;
            padding: 8px 16px;
            border-bottom: 1px solid ${palette['border-basic-color-3']};
            background: ${palette['background-basic-color-2']};
            justify-content: space-between;
          }
          .content-nav {
            flex: 1;
          }

          .breadcrumb h2,
          span {
            margin: 0 8px;
          }
        `}
      </style>
    </>
  )
}
