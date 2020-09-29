import { User } from '@app/logic'
import React from 'react'
import { UserCard } from './card'

interface Props {
  users: User[]
}

/**
 * User list.
 * @param props Props.
 */
export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <>
      <section id='user-list' className='user-list'>
        {users.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </section>

      <style jsx>
        {`
          .user-list {
          }
        `}
      </style>
    </>
  )
}
