import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getEnumEntries } from '@/utilities/enumHelpers'

export function useEnumSelect<TValue>(
  enumObj: Record<string, TValue>,
  i18nKey: string,
  allowedValues?: TValue[],
) {
  const { t } = useI18n()

  let entries = getEnumEntries(enumObj)

  if (allowedValues && allowedValues.length > 0) {
    entries = allowedValues
      .map((allowedValue) => entries.find(({ value }) => value === allowedValue))
      .filter((entry): entry is { key: string; value: TValue } => entry !== undefined)
  }

  const items = computed(() => {
    return entries.map(({ key, value }) => ({
      title: t(`${i18nKey}.${key.toLowerCase()}`),
      value: value,
    }))
  })

  return { items }
}
