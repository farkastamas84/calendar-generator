import type { DayOfWeek } from '@/types/DayOfWeek'

const week1StartCache = new Map()

function getWeek1Start(year: number, weekStartsOn: DayOfWeek, minimalDays: number) {
  const key = `${weekStartsOn}|${minimalDays}|${year}`
  if (week1StartCache.has(key)) {
    return week1StartCache.get(key)
  }

  const jan1 = new Date(year, 0, 1)
  jan1.setHours(0, 0, 0, 0)

  const jan1Day = jan1.getDay()
  const diff = (jan1Day - weekStartsOn + 7) % 7

  const week1Start = new Date(jan1)
  week1Start.setDate(jan1.getDate() - diff)

  const daysInFirstWeek = 7 - diff
  if (daysInFirstWeek < minimalDays) {
    week1Start.setDate(week1Start.getDate() + 7)
  }

  week1StartCache.set(key, week1Start)
  return week1Start
}

function getWeekNumber(date: Date, weekStartsOn: DayOfWeek, minimalDays: number) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)

  const year = d.getFullYear()
  let week1Start = getWeek1Start(year, weekStartsOn, minimalDays)

  if (d < week1Start) {
    week1Start = getWeek1Start(year - 1, weekStartsOn, minimalDays)
  } else {
    const nextWeek1Start = getWeek1Start(year + 1, weekStartsOn, minimalDays)
    if (d >= nextWeek1Start) {
      week1Start = nextWeek1Start
    }
  }

  return 1 + Math.floor((d.getTime() - week1Start.getTime()) / (7 * 864e5))
}

export { getWeekNumber }
