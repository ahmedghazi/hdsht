import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './src/deskStructure'
import {resolveProductionUrl} from './src/actions/resolveProductionUrl'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {presentationTool} from 'sanity/presentation'
import {defaultDocumentNode} from './src/defaultDocumentNode'
import {linkResolverPreview} from './src/linkResolverPreview'
import {colorInput} from '@sanity/color-input'
// import {linkResolverPreview} from './src/linkResolverPreview'

const devOnlyPlugins = [getStartedPlugin()]
const remoteURL = 'https://marie-seguret.vercel.app'
const localURL = 'http://localhost:3000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export default defineConfig({
  name: 'default',
  title: 'Marie Séguret Backoffice',

  projectId: 'uo01rmij',
  dataset: 'production',

  plugins: [
    structureTool({defaultDocumentNode, structure}),
    visionTool(),
    colorInput(),
    ...(isDev ? devOnlyPlugins : []),
    // media(),
    presentationTool({
      resolve: linkResolverPreview,
      previewUrl: {
        origin: previewURL,
        previewMode: {
          enable: '/api/preview',
          disable: '/api/exit-preview',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // productionUrl: resolveProductionUrlAlt,
    // productionUrl: async (prev, context) => {
    //   const {document} = context
    //   return resolveProductionUrlAlt(document)
    // },
    actions: [resolveProductionUrl],
  },
})

// import {defineConfig} from 'sanity'
// import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
// import {schemaTypes} from './schemaTypes'

// export default defineConfig({
//   name: 'default',
//   title: 'Backoofice Marie Séguret ',

//   projectId: 'uo01rmij',
//   dataset: 'production',

//   plugins: [structureTool(), visionTool()],

//   schema: {
//     types: schemaTypes,
//   },
// })
