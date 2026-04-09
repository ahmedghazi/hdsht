import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {muxInput} from 'sanity-plugin-mux-input'
import {linkResolverPreview} from './src/linkResolverPreview'
import {structure} from './src/deskStructure'
import {media} from 'sanity-plugin-media'

//HDSHT.pink
const remoteURL = 'https://hdsht-preprod.vercel.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL
const plugins = [
  structureTool({structure}),
  presentationTool({
    title: 'Live preview',
    resolve: linkResolverPreview,
    previewUrl: {
      origin: previewURL,
      previewMode: {
        enable: '/preview/enable',
        disable: '/preview/disable',
      },
    },
  }),
  visionTool(),
  media(),
  colorInput(),
  muxInput(),
]
if (isDev) plugins.push(visionTool())
export default defineConfig({
  name: 'default',
  title: 'HDSHT.pink — website',

  projectId: '9t2gkolo',
  dataset: 'production',

  plugins: plugins,

  schema: {
    types: schemaTypes,
  },
})
