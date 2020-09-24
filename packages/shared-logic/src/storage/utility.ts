import AsyncStorage from '@react-native-community/async-storage'
import { Logger } from '../logger'
import { StorageKey, StorageParser } from './types'

const logger = Logger.create({
  src: 'storage'
})

/**
 * Returns the value of a local storage item.
 * @param key Key.
 * @param [parse] Parse the value?
 * @returns Item value.
 */
export async function get<T = string> (
  key: StorageKey,
  parse?: boolean | StorageParser<T>
) {
  try {
    const storageValue = await AsyncStorage.getItem(key)
    logger.debug('get', { key, storageValue })

    if (storageValue) {
      const value =
        parse === true
          ? (JSON.parse(storageValue) as T)
          : typeof parse === 'function'
            ? parse(storageValue)
            : ((storageValue as unknown) as T)

      logger.debug('get/value', { key, storageValue })
      return value
    }
  } catch (error) {
    // istanbul ignore next
    logger.error('get/error', error)
  }

  return undefined
}

/**
 * Removes an item from the local storage.
 * @param key Key.
 */
export async function remove (key: StorageKey) {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    // istanbul ignore next
    logger.error('remove/error', { key })
  }
}

/**
 * Sets the value of a local storage item.
 * @param key Key.
 * @param value Value.
 */
export async function set<T = string> (key: StorageKey, value?: T) {
  if (!value) return remove(key)

  try {
    await AsyncStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    )
  } catch (error) {
    // istanbul ignore next
    logger.error('set/error', { key })
  }
}
