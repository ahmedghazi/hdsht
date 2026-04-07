// AUTO-GENERATED EXTENDED TYPES - DO NOT EDIT MANUALLY
// Generated on: 2026-04-07T11:08:37.125Z
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
  PROJECT_QUERY_RESULT
} from './sanity.types'

export type ContributionExpanded = Omit<Contribution, 'service' | 'contributors'> & {
  service?: Service | null;
  contributors?: Array<Person> | null;
};

export type ProjectExpanded = Omit<Project, 'client' | 'location' | 'locations' | 'services' | 'relatedProjects' | 'contributions' | 'media'> & {
  client?: Client | null;
  location?: Array<Location> | null;
  locations?: Array<Location> | null;
  services?: Array<Service> | null;
  relatedProjects?: Array<ProjectExpanded> | null;
  contributions?: Array<ContributionExpanded> | null;
  media?: Array<NonNullable<Project['media']>[number] extends infer M ? M extends { _type: 'video' } ? Omit<M, 'video'> & { video?: { asset?: { playbackId?: string; data?: { aspect_ratio?: string; duration?: number } } | null } | null } : M : never> | null;
};

export type PROJECT_QUERY_RESULTExpanded = Omit<PROJECT_QUERY_RESULT, 'location' | 'services'> & {
  location?: Array<Location> | null;
  services?: Array<Service> | null;
};
