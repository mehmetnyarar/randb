import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

interface Props extends ImageProps {
  width?: number | string
  height?: number | string
  margin?: number | string
}

/**
 * Image.
 */
export const Image: React.FC<Props> = props => {
  const { margin, width = 400, height = 300, ...imgProps } = props

  return (
    <>
      <div className='image'>
        <img {...imgProps} />
      </div>

      <style jsx>
        {`
          .image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: ${typeof width === 'string' ? width : `${width}px`};
            height: ${typeof height === 'string' ? height : `${height}px`};
            margin: ${typeof margin === 'string' ? margin : `${margin || 0}px`};
          }
        `}
      </style>
    </>
  )
}
