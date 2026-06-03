import { createClient } from '@sanity/client'

const QUERY = `*[_type == "project" && _id in $ids]{
  _type,
  _id,
  slug,
  seo{
    ...,
    metaImage{ asset-> }
  },
  title,
  imageCover{ ..., asset-> },
  videoCover{ ..., video{ asset-> } },
  rip,
  year,
  ID,
  client->,
  contributions[]{
    service->{ title },
    contributors[]->{ name }
  },
  media[]{
    ...,
    _type == 'image' => { ..., asset-> },
    _type == 'video' => {
      ...,
      video{
        asset->{
          playbackId,
          data{ aspect_ratio, duration }
        }
      }
    }
  }
}`

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const ids = Array.isArray(q.ids) ? (q.ids as string[]) : q.ids ? [q.ids as string] : []

  if (!ids.length) return []

  const client = createClient({
    projectId: process.env.NUXT_SANITY_PROJECT_ID!,
    dataset: process.env.NUXT_SANITY_DATASET || 'production',
    apiVersion: process.env.NUXT_SANITY_API_VERSION || '2024-03-15',
    token: process.env.NUXT_SANITY_API_READ_TOKEN,
    useCdn: true,
  })

  return client.fetch(QUERY, { ids })
})
