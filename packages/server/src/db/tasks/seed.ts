import { DocumentType } from '@typegoose/typegoose'
import { hash } from 'bcrypt'
import { omit } from 'lodash'
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
import { CurrentUser, excel } from '~/modules'

const logger = Logger.create({
  src: 'db/seed',
  file: 'info'
})

const SEED_USERS = true
const SEED_NETWORK = false

/**
 * Seeds database with initial data.
 * (Drops the existing database and creates a new one).
 */
export const seed = async () => {
  logger.info('Start')

  // To allow users to signin with their email addresses
  const domain = DOMAIN === 'localhost' ? 'localhost.com' : DOMAIN

  let users: DocumentType<User>[] = []

  if (SEED_USERS) {
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

    users = await Promise.all(
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
  }

  if (SEED_NETWORK) {
    const user = new CurrentUser(users[0])

    const g2 = await excel.g2.from(join(__dirname, 'data/g2.xlsx'), user)
    const g2Report = await g2.getNetworkImportReport(true)
    logger.info('Import 2G', omit(g2Report, 'logs'))

    const g3 = await excel.g3.from(join(__dirname, 'data/g3.xlsx'), user)
    const g3Report = await g3.getNetworkImportReport(true)
    logger.info('Import 3G', omit(g3Report, 'logs'))

    const g4 = await excel.g4.from(join(__dirname, 'data/g4.xlsx'), user)
    const g4Report = await g4.getNetworkImportReport(true)
    logger.info('Import 4G', omit(g4Report, 'logs'))
  }

  logger.info('Done')
}
