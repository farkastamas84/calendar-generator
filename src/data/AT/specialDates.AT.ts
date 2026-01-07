import { type IsoDate, toIsoDate as iso } from '@/types/IsoDate'
import { SpecialDateType } from '@/types/SpecialDateType'

const specialDates: Record<IsoDate, SpecialDateType> = {
  // 2027
  [iso('2027-01-01')]: SpecialDateType.Holiday,
  // 2026
  [iso('2026-12-26')]: SpecialDateType.Holiday,
  [iso('2026-12-25')]: SpecialDateType.Holiday,
  [iso('2026-12-08')]: SpecialDateType.Holiday,
  [iso('2026-11-01')]: SpecialDateType.Holiday,
  [iso('2026-10-26')]: SpecialDateType.Holiday,
  [iso('2026-08-15')]: SpecialDateType.Holiday,
  [iso('2026-06-04')]: SpecialDateType.Holiday,
  [iso('2026-05-25')]: SpecialDateType.Holiday,
  [iso('2026-05-24')]: SpecialDateType.Holiday,
  [iso('2026-05-14')]: SpecialDateType.Holiday,
  [iso('2026-05-01')]: SpecialDateType.Holiday,
  [iso('2026-04-06')]: SpecialDateType.Holiday,
  [iso('2026-04-05')]: SpecialDateType.Holiday,
  [iso('2026-01-06')]: SpecialDateType.Holiday,
  [iso('2026-01-01')]: SpecialDateType.Holiday,
  // 2025
  [iso('2025-12-26')]: SpecialDateType.Holiday,
  [iso('2025-12-25')]: SpecialDateType.Holiday,
  [iso('2025-12-08')]: SpecialDateType.Holiday,
  [iso('2025-11-01')]: SpecialDateType.Holiday,
  [iso('2025-10-26')]: SpecialDateType.Holiday,
  [iso('2025-08-15')]: SpecialDateType.Holiday,
  [iso('2025-06-19')]: SpecialDateType.Holiday,
  [iso('2025-06-09')]: SpecialDateType.Holiday,
  [iso('2025-06-08')]: SpecialDateType.Holiday,
  [iso('2025-05-29')]: SpecialDateType.Holiday,
  [iso('2025-05-01')]: SpecialDateType.Holiday,
  [iso('2025-04-21')]: SpecialDateType.Holiday,
  [iso('2025-04-20')]: SpecialDateType.Holiday,
  [iso('2025-01-06')]: SpecialDateType.Holiday,
  [iso('2025-01-01')]: SpecialDateType.Holiday,
}

export default specialDates
