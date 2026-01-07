import type { DayOfWeek } from '@/types/DayOfWeek'
import type { IsoDate } from '@/types/IsoDate'

export default {
  getWeekStartDate(date: IsoDate, firstDayOfTheWeek: DayOfWeek) {
    const newDate = new Date(date)
    while (newDate.getDay() != firstDayOfTheWeek) {
      newDate.setDate(newDate.getDate() - 1)
    }
    return newDate
  },
  getWeekEndDate(date: IsoDate, lastDayOfTheWeek: DayOfWeek) {
    const newDate = new Date(date)
    while (newDate.getDay() != lastDayOfTheWeek) {
      newDate.setDate(newDate.getDate() + 1)
    }
    return newDate
  },

  isFirstDayOfTheMonth(date: Date) {
    return date.getDate() == 1
  },
  isFirstPeriodOfTheMonth(date: Date) {
    return date.getDate() <= 7
  },
  getSuggestedYear() {
    const date = new Date()
    const year = date.getFullYear()
    return date.getMonth() < 11 ? year : year + 1
  },
}
