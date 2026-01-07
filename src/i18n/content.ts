import { createI18n } from 'vue-i18n'
import de from './de/content.de.json'
import en from './en/content.en.json'
import hu from './hu/content.hu.json'

const messages = {
  en,
  hu,
  de,
}

export const contentI18n = createI18n({
  legacy: false,
  locale: 'en',
  missingWarn: false,
  fallbackLocale: 'en',
  fallbackWarn: false,
  messages,
})
