import React from 'react'
import { ContentHeader, ContentHeaderProps } from './content-header'

interface Props extends ContentHeaderProps {
  padding?: number
  direction?: 'row' | 'column'
  justify?: 'flex-start' | 'center'
  align?: 'flex-start' | 'center' | 'stretch'
}

/**
 * Main.
 * @param props Props.
 */
export const Main: React.FC<Props> = props => {
  const {
    padding = 16,
    direction = 'column',
    justify = 'flex-start',
    align = 'stretch',
    children,
    ...contentHeaderProps
  } = props

  return (
    <>
      <div id='main' className='main-content'>
        <ContentHeader {...contentHeaderProps} />
        <main role='main'>{children}</main>
      </div>

      <style jsx>
        {`
          .main-content {
            padding-top: 75px; /* Page header is fixed */
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
          }

          main {
            flex: 1;
            display: flex;
            flex-direction: ${direction};
            justify-content: ${justify};
            align-items: ${align};
            padding: ${padding === 0 ? 0 : padding}px;
          }
        `}
      </style>
    </>
  )
}
