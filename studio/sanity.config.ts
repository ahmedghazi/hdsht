import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {muxInput} from 'sanity-plugin-mux-input'
import {linkResolverPreview} from './src/linkResolverPreview'
import {structure} from './src/deskStructure'

//HDSHT.pink
const remoteURL = 'https://hdsht-preprod.vercel.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export default defineConfig({
  name: 'default',
  title: 'HDSHT.pink — website',

  projectId: '9t2gkolo',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    colorInput(),
    muxInput(),
    presentationTool({
      resolve: linkResolverPreview,
      previewUrl: {
        origin: previewURL,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
