import type {
  LocaleCode,
  LocaleField,
  LocaleValue,
} from '~/utils/sanity-api/sanity-extend.types'

import type {
  BlockContent,
  LocaleBlockContent,
  LocaleString,
  LocaleText,
} from '~/utils/sanity-api/sanity.types'

/**
 * Extends @nuxt/ui's useLocale with Sanity localized field resolution.
 * Reads locale from @nuxtjs/i18n — single source of truth for the whole app.
 */
export function useSanityLocale() {
  const { locale, setLocale } = useI18n()

  function _localizeField(
    field: LocaleString | LocaleText | undefined,
  ): string | undefined
  function _localizeField(field: LocaleBlockContent): BlockContent | undefined
  function _localizeField<T extends LocaleField>(
    field: T | null | undefined,
  ): LocaleValue<T> | undefined {
    if (!field) return `undefined in ${locale.value}`
    return field[locale.value as LocaleCode] ?? field.en
  }

  return { locale, setLocale, _localizeField }
}
