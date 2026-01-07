export type IsoDate = string & { readonly __isoDate: unique symbol }

export function toIsoDate(value: string): IsoDate {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ISO date: ${value}`)
  }
  return value as IsoDate
}
