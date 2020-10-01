import { DocumentType } from '@typegoose/typegoose'
import { toLower } from 'lodash'
import { Logger } from '~/logger'
import { PersonNameInput } from '~/models/embed'
import { UserModel } from './model'
import { User } from './type'

const logger = Logger.create({
  src: 'user',
  level: 'off'
})

/**
 * Creates a username.
 * @param name Person name.
 * @returns Username.
 */
export const createUsername = async ({ first, last }: PersonNameInput) => {
  const base = `${toLower(first)}-${toLower(last)}`
  logger.debug('createUsername', { base })

  let index = 0
  let user: DocumentType<User> | undefined | null
  let username = base

  do {
    if (index > 0) username = `${base}-${index}`
    user = await UserModel.findOne({ username })
    logger.debug('createUsername', { index, username, user: user?.toJSON() })
    index += 1
  } while (user)

  logger.debug('createUsername', { username })
  return username
}
