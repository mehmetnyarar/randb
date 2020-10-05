import { stringify, User, UserRole } from '@app/logic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from '~/i18n'
import { DangerButton, InfoButton } from '../button'
import { Card } from '../card'
import { InfoTable } from '../info'

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

  const { id, username, name, email, phone } = user

  const [loading, setLoading] = useState(false)
  const canDelete = !isDisabled && !user.roles.includes(UserRole.SA) && !loading
  const canEdit = !isDisabled && !user.roles.includes(UserRole.SA) && !loading

  return (
    <Card
      title={stringify.personName(name)}
      content={
        <InfoTable
          records={[
            { label: t('email'), value: email },
            { label: t('phone'), value: stringify.phoneNo(phone) },
            {
              label: t('user.roles'),
              value: user.roles.map(role => ({
                value: t(`user.role.${role}`) as string
              }))
            }
          ]}
        />
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
