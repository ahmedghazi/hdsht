// AUTO-GENERATED EXTENDED TYPES - DO NOT EDIT MANUALLY
// Generated on: 2026-03-23T15:05:44.512Z
// Run 'npm run typegen' to regenerate
// Project structure: web="../../web", studio="./"
// Detection method: configuration file

import type {
  Project,
  Client,
  Person
} from "./sanity.types";

export type ProjectExpanded = Omit<Project, 'client' | 'persons'> & {
  client?: Client | null;
  persons?: Array<Person> | null;
};
