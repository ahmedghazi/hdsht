import type { BlockContent } from './sanity.types'

// ─── Langues supportées ────────────────────────────────────────────
export type LocaleCode = 'en' | 'zh'

// ─── Tes types Sanity (inchangés) ──────────────────────────────────
export type LocaleString = {
  _type: 'localeString'
  en?: string
  zh?: string
}

export type LocaleText = {
  _type: 'localeText'
  en?: string
  zh?: string
}

export type LocaleBlockContent = {
  _type: 'localeBlockContent'
  en?: BlockContent
  zh?: BlockContent
}

// ─── Union discriminée sur _type ───────────────────────────────────
// Permet à _localizeField d'inférer le type de retour
// selon ce qu'on lui passe (string vs BlockContent)
export type LocaleField = LocaleString | LocaleText | LocaleBlockContent

// Utilitaire : extrait le type de valeur d'un LocaleField
// Ex : LocaleValue<LocaleString> → string
//      LocaleValue<LocaleBlockContent> → BlockContent
export type LocaleValue<T extends LocaleField> = T[LocaleCode]

export type FilterType = 'clients' | 'years' | 'services' | 'ids'
export type FilterValue = string[]
export type Filters = Record<FilterType, FilterValue>
