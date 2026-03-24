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
// // AUTO-GENERATED EXTENDED TYPES - DO NOT EDIT MANUALLY
// // Generated on: 2026-03-23T17:54:24.490Z
// // Run 'npm run typegen' to regenerate
// // Project structure: web="../../web", studio="./"
// // Detection method: configuration file

// import type {
//   Project,
//   Client,
//   Person,
//   HOME_QUERY_RESULT,
//   PAGE_MODULAIRE_QUERY_RESULT,
//   PROJECT_QUERY_RESULT
// } from './sanity.types'

// export type ProjectExpanded = Omit<Project, 'client' | 'persons'> & {
//   client?: Client | null;
//   persons?: Array<Person> | null;
// };

// export type HOME_QUERY_RESULTExpanded = Omit<HOME_QUERY_RESULT, 'modules'> & {
//   modules?: Array<Client> | null;
// };

// export type PAGE_MODULAIRE_QUERY_RESULTExpanded = Omit<PAGE_MODULAIRE_QUERY_RESULT, 'modules'> & {
//   modules?: Array<Client> | null;
// };

// export type PROJECT_QUERY_RESULTExpanded = Omit<PROJECT_QUERY_RESULT, 'client' | 'persons'> & {
//   client?: Client | null;
//   persons?: Array<Person> | null;
// };
