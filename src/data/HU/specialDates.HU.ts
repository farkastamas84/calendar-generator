import { type IsoDate, toIsoDate as iso } from '@/types/IsoDate'
import { SpecialDateType } from '@/types/SpecialDateType'

const specialDates: Record<IsoDate, SpecialDateType> = {
  // 2027
  [iso('2027-01-01')]: SpecialDateType.Holiday,
  // 2026
  [iso('2026-12-26')]: SpecialDateType.Holiday,
  [iso('2026-12-25')]: SpecialDateType.Holiday,
  [iso('2026-12-24')]: SpecialDateType.RestDay,
  [iso('2026-12-12')]: SpecialDateType.WorkDay, // 2026-12-24
  [iso('2026-11-01')]: SpecialDateType.Holiday,
  [iso('2026-10-23')]: SpecialDateType.Holiday,
  [iso('2026-08-21')]: SpecialDateType.RestDay,
  [iso('2026-08-20')]: SpecialDateType.Holiday,
  [iso('2026-08-08')]: SpecialDateType.WorkDay, // 2026-08-21
  [iso('2026-05-25')]: SpecialDateType.Holiday,
  [iso('2026-05-24')]: SpecialDateType.Holiday,
  [iso('2026-05-01')]: SpecialDateType.Holiday,
  [iso('2026-04-06')]: SpecialDateType.Holiday,
  [iso('2026-04-05')]: SpecialDateType.Holiday,
  [iso('2026-04-03')]: SpecialDateType.Holiday,
  [iso('2026-03-15')]: SpecialDateType.Holiday,
  [iso('2026-01-10')]: SpecialDateType.WorkDay, // 2026-01-02
  [iso('2026-01-02')]: SpecialDateType.RestDay,
  [iso('2026-01-01')]: SpecialDateType.Holiday,
  // 2025
  [iso('2025-12-26')]: SpecialDateType.Holiday,
  [iso('2025-12-25')]: SpecialDateType.Holiday,
  [iso('2025-12-24')]: SpecialDateType.RestDay,
  [iso('2025-12-13')]: SpecialDateType.WorkDay, // 2025-12-24
  [iso('2025-11-01')]: SpecialDateType.Holiday,
  [iso('2025-10-24')]: SpecialDateType.RestDay,
  [iso('2025-10-23')]: SpecialDateType.Holiday,
  [iso('2025-10-18')]: SpecialDateType.WorkDay, // 2025-10-24
  [iso('2025-08-20')]: SpecialDateType.Holiday,
  [iso('2025-06-09')]: SpecialDateType.Holiday,
  [iso('2025-06-08')]: SpecialDateType.Holiday,
  [iso('2025-05-17')]: SpecialDateType.WorkDay, // 2025-05-02
  [iso('2025-05-02')]: SpecialDateType.RestDay,
  [iso('2025-05-01')]: SpecialDateType.Holiday,
  [iso('2025-04-21')]: SpecialDateType.Holiday,
  [iso('2025-04-20')]: SpecialDateType.Holiday,
  [iso('2025-04-18')]: SpecialDateType.Holiday,
  [iso('2025-03-15')]: SpecialDateType.Holiday,
  [iso('2025-01-01')]: SpecialDateType.Holiday,
}

export default specialDates
