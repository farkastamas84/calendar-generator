import dateHelper from '../utilities/dateHelper'
import specialDateHelper from '@/utilities/specialDateHelper'
import FlexCalendarData from './FlexCalendarData'
import type FlexCellData from './FlexCellData'
import type { CountryCode } from '@/types/CountryCode'
import { DayOfWeek } from '@/types/DayOfWeek'
import type { IsoDate } from '@/types/IsoDate'
import { getWeekNumber } from '@/utilities/weekNumbering'

export default {
  generate(
    countryCode: CountryCode,
    fromDate: IsoDate,
    toDate: IsoDate,
    firstDayOfTheWeek: DayOfWeek,
    minimalDays: number,
  ): FlexCalendarData {
    const lastDayOfTheWeek = ((firstDayOfTheWeek + 6) % 7) as DayOfWeek

    const calendar: FlexCalendarData = new FlexCalendarData()

    const startDate = dateHelper.getWeekStartDate(fromDate, firstDayOfTheWeek)
    const endDate = dateHelper.getWeekEndDate(toDate, lastDayOfTheWeek)

    let date = startDate

    while (date.getTime() <= endDate.getTime()) {
      const cell: FlexCellData = {
        date: date,
        weekNumber: getWeekNumber(date, firstDayOfTheWeek, minimalDays),
        isFirstDayOfTheWeek: date.getDay() == firstDayOfTheWeek,
        isFirstDayOfTheMonth: dateHelper.isFirstDayOfTheMonth(date),
        isFirstPeriodOfTheMonth: dateHelper.isFirstPeriodOfTheMonth(date),
        isHoliday: specialDateHelper.isHoliday(countryCode, date),
        isRestDay: isRestDay(date),
      }

      calendar.cells.push(cell)

      const nextDate = new Date(date.getTime())
      nextDate.setDate(date.getDate() + 1)
      date = nextDate
    }

    function isWeekend(date: Date) {
      return date.getDay() == DayOfWeek.Saturday || date.getDay() == DayOfWeek.Sunday
    }

    function isRestDay(date: Date) {
      return (
        (isWeekend(date) && !specialDateHelper.isExtraWorkDay(countryCode, date)) ||
        specialDateHelper.isHoliday(countryCode, date) ||
        specialDateHelper.isExtraRestDay(countryCode, date)
      )
    }

    return calendar
  },
}
