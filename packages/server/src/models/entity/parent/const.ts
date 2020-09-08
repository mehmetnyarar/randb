import { CreateQuery } from 'mongoose'
import { Parent } from './type'

/**
 * Default parent.
 */
export const DEFAULT_PARENT: CreateQuery<Parent> = {
  ID: undefined,
  name: '',
  sites: [],
  isActive: true
}
