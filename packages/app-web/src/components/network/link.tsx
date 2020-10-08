import { EntityType } from '@app/logic'
import Link from 'next/link'
import React, { useMemo } from 'react'

/**
 * Returns the base url.
 * @param type Entity type.
 * @returns URL.
 */
const getBaseUrl = (type: EntityType) => {
  switch (type) {
    case EntityType.SITE:
      return '/sites'
    case EntityType.CELL:
      return '/cells'
    default:
      return ''
  }
}

interface Props {
  type: EntityType
  name: string
  text?: string
}

/**
 * Entity link.
 */
export const EntityLink: React.FC<Props> = ({ type, name, text }) => {
  const baseUrl = useMemo(() => getBaseUrl(type), [type])

  return (
    <>
      {baseUrl ? (
        <Link
          as={`${baseUrl}/${name}`}
          href={{ pathname: `${baseUrl}/[name]`, query: { name } }}
        >
          {text || name}
        </Link>
      ) : (
        text || name
      )}
    </>
  )
}
