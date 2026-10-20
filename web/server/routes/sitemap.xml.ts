import { createClient } from '@sanity/client'
import groq from 'groq'
import { _linkResolver } from '../../app/utils'
import type { Slug } from '../../app/utils/sanity-api/sanity.types'

type SitemapDoc = (
  | { _type: 'pageModulaire'; homePage?: boolean }
  | { _type: 'project' }
) & {
  slug: Slug | null
  _updatedAt: string
}

const SITEMAP_QUERY = groq`*[
  _type in ["pageModulaire", "project"]
  && !(_id in path("drafts.**"))
  && (homePage == true || defined(slug.current))
]{ _type, slug, homePage, _updatedAt }`

// Pages that live in app/pages but aren't Sanity documents
const STATIC_ROUTES = ['/system', '/sample']

const escapeXml = (str: string) =>
  str.replace(/[<>&'"]/g, (c) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '\'': '&apos;',
    '"': '&quot;',
  })[c] as string)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  const { projectId, dataset, apiVersion } = config.public.sanity

  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
  })

  const docs = await sanityClient.fetch<SitemapDoc[]>(SITEMAP_QUERY)

  const urls = [
    ...docs.map(doc => ({ loc: _linkResolver(doc), lastmod: doc._updatedAt })),
    ...STATIC_ROUTES.map(loc => ({ loc, lastmod: undefined })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${escapeXml(siteUrl + url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
