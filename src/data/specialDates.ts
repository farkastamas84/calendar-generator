import type { CountryCode } from '@/types/CountryCode'
import type { IsoDate } from '@/types/IsoDate'
import type { SpecialDateType } from '@/types/SpecialDateType'

import AT from './AT/specialDates.AT'
import HU from './HU/specialDates.HU'

const specialDates: Partial<Record<CountryCode, Record<IsoDate, SpecialDateType>>> = {
  AT,
  HU,
}

export default specialDates
