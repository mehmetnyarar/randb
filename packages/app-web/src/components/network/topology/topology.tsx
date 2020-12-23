import { Network, NetworkType } from '@app/logic'
import { Theme } from '@app/ui'
import React, { useContext } from 'react'
import { GhostButton } from '~/components/button'
import { Loading } from '~/components/loading'
import { useTranslation } from '~/i18n'
import { ElementView } from './element'

interface Props {}

/**
 * Network topology.
 */
export const TopologyView: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { palette } = useContext(Theme)
  const {
    network,
    loading,
    result,
    onNetworkChange,
    query,
    onQueryChange,
    reload
  } = useContext(Network)

  return (
    <>
      <div className='ne-search'>
        <input
          type='search'
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          aria-label='Network Search'
        />
      </div>

      <ul className='ne-network'>
        {Object.values(NetworkType).map((type, index) => {
          return (
            <li key={index} className='ne-network-type'>
              <input
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
        <GhostButton onClick={() => reload(network)} disabled={loading}>
          <Loading icon spin={loading} />
        </GhostButton>
      </ul>

      <ul className='ne-list'>
        {result.map((ne, i) => (
          <ElementView key={i} element={ne} />
        ))}
      </ul>

      <style jsx>
        {`
          .ne-search {
            margin-top: 6px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .ne-search input {
            flex: 1;
          }

          .ne-network {
            margin: 8px 0;
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
            height: 300px;
            overflow-y: auto;
            border-radius: 4px;
            border: 1px solid ${palette['border-basic-color-3']};
          }

          @media screen and (min-width: 600px) {
            .ne-list {
              height: 400px;
            }
          }
        `}
      </style>
    </>
  )
}
