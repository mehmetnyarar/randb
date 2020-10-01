import { Theme } from '@app/ui'
import React, { ReactNode, useContext } from 'react'
import { Divider } from './divider'

interface Props {
  title: string
  content: ReactNode
  actions?: ReactNode
}

/**
 * Card.
 * @param props Props.
 */
export const Card: React.FC<Props> = ({ title, content, actions }) => {
  const { palette } = useContext(Theme)

  return (
    <>
      <article id='card' className='card'>
        <header className='card-title'>
          <h4>{title}</h4>
        </header>
        <Divider />
        <section className='card-content'>{content}</section>
        {actions && (
          <>
            <Divider />
            <aside className='card-actions'>{actions}</aside>
          </>
        )}
      </article>

      <style jsx>
        {`
          .card {
            margin: 0 16px 16px 0;
            min-width: 300px;
            border-radius: 4px;
            border: 1px solid ${palette['border-basic-color-4']};
            background: ${palette['background-basic-color-2']};
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }

          .card-title {
            padding: 16px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .card-title h4 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
          }

          .card-content {
            padding: 16px;
            font-size: smaller;
          }

          .card-actions {
            padding: 16px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}
