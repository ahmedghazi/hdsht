import type {
  PageModulaire,
  Project,
  Slug,
} from '~/utils/sanity-api/sanity.types'
import type { ProjectExpanded } from './sanity-api/sanity-expanded.types'

export function _formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
}

export function _linkResolver(
  doc:
    | Project
    | ProjectExpanded
    | PageModulaire
    | { _type: 'pageModulaire'; slug: Slug | null }
    | { _type: 'project'; slug: Slug | null }
    | string,
) {
  // Handle external links (strings)
  if (typeof doc === 'string') {
    return doc
  }

  // Handle partial link objects from settings query
  if ('homePage' in doc && doc._type === 'pageModulaire' && doc.homePage) {
    return '/'
  }

  switch (doc._type) {
    case 'project':
      return `/prjct/${doc.slug?.current}`
    case 'pageModulaire':
      return `/${doc.slug?.current}`

    default:
      return `/`
  }
}
