import { User } from '@app/logic'
import React from 'react'
import { useTranslation } from '~/i18n'
import { DeleteButton, EditButton } from '../button'
import { Card } from '../card'
import { Info } from '../info'

interface Props {
  user: User
}

/**
 * User card.
 * @param props Props.
 */
export const UserCard: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation()

  const {
    name,
    email,
    phone: { cc, dc, sn }
  } = user
  const title = `${name.first} ${name.last}`
  const phone = `+${cc}${dc}${sn}`
  const roles = user.roles.map(role => t(`user.role.${role}`))
  const canEdit = false
  const canDelete = false

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
          <EditButton disabled={!canEdit}>{t('edit')}</EditButton>
          <DeleteButton disabled={!canDelete}>{t('delete')}</DeleteButton>
        </>
      }
    />
  )
}
