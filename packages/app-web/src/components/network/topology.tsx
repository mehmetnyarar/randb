import { Ne, NetworkType, useTopology } from '@app/logic'
import React, { useState } from 'react'
import { useTranslation } from '~/i18n'
import { InfoButton } from '../button'
import { ElementView } from './element'

interface Props {}

/**
 * Network topology.
 */
export const TopologyView: React.FC<Props> = () => {
  const { t } = useTranslation()
  const {
    network,
    loading,
    result,
    onNetworkChange,
    query,
    onQueryChange
  } = useTopology({
    // FIXME Lazy queries don't return results after the first time
    // Instead of "keepFresh" option, "reload" fn could be used
    keepFresh: false
  })

  const [current, setCurrent] = useState<Ne>()

  return (
    <>
      <div className='ne-search'>
        <input
          type='search'
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          aria-label={t('search')}
        />
        <InfoButton>{t('search')}</InfoButton>
      </div>

      <ul className='ne-network'>
        {Object.values(NetworkType).map((type, i) => {
          return (
            <li key={i} className='ne-network-type'>
              <input
                key={i}
                id={type}
                type='radio'
                name='network'
                disabled={loading}
                value={type}
                checked={network === type}
                onChange={e => {
                  if (e.target.checked) {
                    onNetworkChange(type)
                  }
                }}
              />
              <label htmlFor={type}>{t(`network.${type}`)}</label>
            </li>
          )
        })}
        {loading && <span>...</span>}
      </ul>

      <ul className='ne-list'>
        {result.map((ne, i) => (
          <ElementView
            key={i}
            element={ne}
            onSelect={setCurrent}
            current={current}
          />
        ))}
      </ul>

      <style jsx>
        {`
          .ne-search {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .ne-search input {
            flex: 1;
            margin-right: 8px;
          }

          .ne-network {
            width: 100%;
            margin: 16px 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: baseline;
          }
          .ne-network span {
            align-self: flex-end;
          }

          .ne-network-type {
            margin-right: 8px;
          }

          .ne-list {
            width: 100%;
            overflow-y: auto;
          }
        `}
      </style>
    </>
  )
}
