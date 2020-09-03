import { Logger } from '~/logger'
import {
  DEFAULT_USER,
  getPersonName,
  getPhoneNumber,
  User,
  UserModel
} from '~/models'

const logger = Logger.create({
  src: 'db/seed',
  file: 'info'
})

/**
 * Seeds database with initial data.
 * (Drops the existing database and creates a new one).
 */
export const seed = async () => {
  // #region Users

  const userData: Partial<User>[] = [
    {
      name: { first: 'Super', last: 'Admin' },
      phone: { cc: '1', dc: '100', sn: '1000001' }
    }
  ]

  const users = await Promise.all(
    userData.map(async item => {
      const user = await UserModel.create({
        ...DEFAULT_USER,
        ...item
      })

      const name = getPersonName(user.name)
      const phone = getPhoneNumber(user.phone)
      logger.success(`User: ${name}/${user.email}/${phone}`)

      return user
    })
  )

  logger.info(`Users: ${users.length}`)

  // #endregion
}
