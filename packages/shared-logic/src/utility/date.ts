/* eslint-disable import/no-duplicates */
import { format, Locale, parseISO } from 'date-fns'
import { enUS, ru, tr } from 'date-fns/locale'
import { Language } from '../graphql'

/**
 * Date type.
 */
export type DateType = string | number | Date

/**
 * Date format.
 * @see https://date-fns.org/v2.12.0/docs/format
 */
export enum DateFormat {
  d = 'dd',
  m = 'MMM',
  dm = 'MMMM do',
  y = 'yyyy',
  my = 'MMM yyyy',
  ymd = 'yyyyMMdd',
  dmy = 'dd.MM.yyyy',
  dmyhm = 'dd.MM.yyyy HH:mm',
  dmyhms = 'dd.MM.yyyy HH:mm:ss',
  dmyhmsms = 'dd.MM.yyyy HH:mm:ss:SSS',
  hm = 'HH:mm',
  hma = 'hh:mm aa',
  hms = 'HH:mm:ss',
  hmsms = 'HH:mm:ss:SSS'
}

/**
 * Formats date as a string.
 * @param date Date.
 * @param as Format.
 * @returns Stringified date.
 */
export const getDateString = (date?: DateType | null, as = DateFormat.dmy) => {
  if (!date) return ''

  const value =
    typeof date === 'string'
      ? parseISO(date)
      : typeof date === 'number'
        ? new Date(date)
        : date

  return format(value, as)
}

/**
 * Date-Fns locales.
 */
export const DATEFNS_LOCALES: Record<Language, Locale> = {
  en: enUS,
  kz: ru,
  ru,
  tr
}
