export function getEnumValues<TValue>(enumObj: Record<string, TValue>): TValue[] {
  const values = Object.values(enumObj)
  // If there are numeric values...
  const hasNumericValues = values.some((v) => typeof v === 'number')

  if (hasNumericValues) {
    // ...keep those items only (filter out reverse mappings)
    return values.filter((v) => typeof v === 'number') as TValue[]
  }

  return values
}

export function getEnumEntries<TValue>(
  enumObj: Record<string, TValue>,
): Array<{ key: string; value: TValue }> {
  const entries = Object.entries(enumObj)
  // If there are numeric values...
  const hasNumericValues = entries.some(([, v]) => typeof v === 'number')

  if (hasNumericValues) {
    // ...keep those items only (filter out reverse mappings)
    return entries.filter(([, v]) => typeof v === 'number').map(([key, value]) => ({ key, value }))
  }

  return entries.map(([key, value]) => ({ key, value }))
}
