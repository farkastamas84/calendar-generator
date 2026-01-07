import { createI18n } from 'vue-i18n'
import en from './en/ui.en.json'
import hu from './hu/ui.hu.json'

const messages = {
  en,
  hu,
}

export const uiI18n = createI18n({
  legacy: false,
  locale: 'en',
  missingWarn: false,
  fallbackLocale: 'en',
  fallbackWarn: false,
  messages,
})
