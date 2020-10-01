import { User, UserRole } from '@app/logic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from '~/i18n'
import { DangerButton, InfoButton } from '../button'
import { Card } from '../card'
import { Info } from '../info'

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

  const {
    id,
    username,
    name,
    email,
    phone: { cc, dc, sn }
  } = user
  const title = `${name.first} ${name.last}`
  const phone = `+${cc}${dc}${sn}`
  const roles = user.roles.map(role => t(`user.role.${role}`))

  const [loading, setLoading] = useState(false)
  const canDelete = !isDisabled && !user.roles.includes(UserRole.SA) && !loading
  const canEdit = !isDisabled && !user.roles.includes(UserRole.SA) && !loading

  return (
    <Card
      title={title}
      content={
        <>
          <Info label={t('email')} value={email} />
          <Info label={t('phone')} value={phone} />
          <Info label={t('user.roles')} values={roles} />
        </>
      }
      actions={
        <>
          <InfoButton
            minWidth={100}
            onClick={() => {
              setLoading(true)
              router.push(`/users/${username}`)
            }}
            disabled={!canEdit}
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
            disabled={!canDelete}
          >
            {t('delete')}
          </DangerButton>
        </>
      }
    />
  )
}
