// AUTO-GENERATED EXTENDED TYPES - DO NOT EDIT MANUALLY
// Generated on: 2026-03-30T13:29:20.430Z
// Run 'npm run typegen' to regenerate
// Project structure: web="../../web", studio="./"
// Detection method: configuration file

import type {
  Contribution,
  Service,
  Person,
  Project,
  Client,
  Location,
  HOME_QUERY_RESULT,
  PAGE_MODULAIRE_QUERY_RESULT,
  PROJECT_QUERY_RESULT
} from './sanity.types'

export type ContributionExpanded = Omit<Contribution, 'service' | 'contributors'> & {
  service?: Service | null;
  contributors?: Array<Person> | null;
};

export type ProjectExpanded = Omit<Project, 'client' | 'location' | 'locations' | 'contributions' | 'services'> & {
  client?: Client | null;
  location?: Array<Location> | null;
  locations?: Array<Location> | null;
  contributions?: Array<Service> | null;
  services?: Array<Service> | null;
};

export type HOME_QUERY_RESULTExpanded = Omit<HOME_QUERY_RESULT, 'modules'> & {
  modules?: Array<Service> | null;
};

export type PAGE_MODULAIRE_QUERY_RESULTExpanded = Omit<PAGE_MODULAIRE_QUERY_RESULT, 'modules'> & {
  modules?: Array<Service> | null;
};

export type PROJECT_QUERY_RESULTExpanded = Omit<PROJECT_QUERY_RESULT, 'location' | 'services'> & {
  location?: Array<Location> | null;
  services?: Array<Service> | null;
};
