import type { CountryCode } from '@/types/CountryCode'
import { toIsoDate, type IsoDate } from '@/types/IsoDate'
import { SpecialDateType } from '@/types/SpecialDateType'
import specialDates from '../data/specialDates'

function getDateOnlyString(date: Date): IsoDate {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return toIsoDate(`${y}-${m}-${d}`)
}

function getDateType(countryCode: CountryCode, date: Date) {
  const dateString = getDateOnlyString(date)
  return specialDates[countryCode]?.[dateString]
}

export default {
  getAvailableCountryCodes() {
    return Object.keys(specialDates) as CountryCode[]
  },
  isHoliday(countryCode: CountryCode, date: Date) {
    return getDateType(countryCode, date) == SpecialDateType.Holiday
  },

  isExtraRestDay(countryCode: CountryCode, date: Date) {
    return getDateType(countryCode, date) == SpecialDateType.RestDay
  },

  isExtraWorkDay(countryCode: CountryCode, date: Date) {
    return getDateType(countryCode, date) == SpecialDateType.WorkDay
  },
}
