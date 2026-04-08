import type { Ref } from 'vue'
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

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as {
    locale: Ref<string>
    t: (key: string) => string
  }

  function localizeField(
    field: LocaleString | LocaleText | undefined,
  ): string | undefined
  function localizeField(field: LocaleBlockContent): BlockContent | undefined
  function localizeField<T extends LocaleField>(
    field: T | null | undefined,
  ): LocaleValue<T> | undefined {
    if (!field) return undefined
    return field[i18n.locale.value as LocaleCode] ?? field.en
  }

  function localizeText(key: string): string {
    return i18n.t(key)
  }

  return {
    provide: { localizeField, localizeText },
  }
})
