import { stringify, User, UserRole } from '@app/logic'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from '~/i18n'
import { DangerButton, InfoButton } from '../button'
import { Card } from '../card'
import { InfoRecord, InfoTable } from '../info'

interface Props {
  user: User
  onDelete: (id: string) => void | Promise<void>
  isDisabled?: boolean
}

/**
 * User card.
 * @param props Props.
 */
export const UserCard: React.FC<Props> = ({ user, onDelete, isDisabled }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { id, username, name, roles } = user
  const sa = useMemo(() => roles.includes(UserRole.SA), [roles])
  const data = useMemo<InfoRecord[]>(() => {
    return [
      { title: t('email'), value: user.email },
      { title: t('phone'), value: stringify.phoneNo(user.phone) },
      {
        title: t('user.roles'),
        render: (
          <ul>
            {user.roles.map((role, index) => (
              <li key={index}>{t(`user.role.${role}`)}</li>
            ))}
          </ul>
        )
      }
    ]
  }, [t, user])
  const [loading, setLoading] = useState(false)

  return (
    <Card
      title={stringify.personName(name)}
      content={<InfoTable data={data} className='full-width' />}
      actions={
        <>
          <InfoButton
            minWidth={100}
            onClick={() => {
              setLoading(true)
              router.push(`/users/${username}`)
            }}
            disabled={sa || loading || isDisabled}
          >
            {t('edit')}
          </InfoButton>
          <DangerButton
            minWidth={100}
            margin='0 0 0 16px'
            onClick={async () => {
              setLoading(true)
              await onDelete(id)
            }}
            disabled={sa || loading || isDisabled}
          >
            {t('delete')}
          </DangerButton>
        </>
      }
    />
  )
}
