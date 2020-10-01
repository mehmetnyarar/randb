import { hash } from 'bcrypt'
import { join } from 'path'
import { DOMAIN, SA_PASSWORD } from '~/config'
import { Logger } from '~/logger'
import {
  DEFAULT_USER,
  getPersonName,
  getPhoneNumber,
  User,
  UserModel,
  UserRole
} from '~/models'
import { excel } from '~/modules'

const logger = Logger.create({
  src: 'db/seed',
  file: 'info'
})

/**
 * Seeds database with initial data.
 * (Drops the existing database and creates a new one).
 */
export const seed = async () => {
  logger.info('Start')

  // To allow users to signin with their email addresses
  const domain = DOMAIN === 'localhost' ? 'localhost.com' : DOMAIN

  // #region Users

  const userData: Partial<User>[] = [
    {
      username: 'sa',
      name: { first: 'Super', last: 'Admin' },
      email: `system.admin@${domain}`,
      phone: { cc: '0', dc: '000', sn: '0000000' },
      roles: [UserRole.SA],
      password: SA_PASSWORD
    }
  ]

  const users = await Promise.all(
    userData.map(async item => {
      const user = await UserModel.create({
        ...DEFAULT_USER,
        ...item,
        password: await hash(item.password, 10)
      })

      const name = getPersonName(user.name)
      const phone = getPhoneNumber(user.phone)
      logger.success(`User: ${name}/${user.email}/${phone}`)

      return user
    })
  )

  logger.info(`Users: ${users.length}`)

  // #endregion

  // #region Network

  const user = users[0]
  await excel.g2.from(join(__dirname, 'data/g2.xlsx'), user)
  await excel.g3.from(join(__dirname, 'data/g3.xlsx'), user)
  await excel.g4.from(join(__dirname, 'data/g4.xlsx'), user)

  // #endregion

  logger.info('Done')
}
