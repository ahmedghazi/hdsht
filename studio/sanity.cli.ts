import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '9t2gkolo',
    dataset: 'production',
  },
  // deployment: {
  //   /**
  //    * Enable auto-updates for studios.
  //    * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
  //    */
  //   autoUpdates: true,
  // }

  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || 'backoffice--hdsht', // Visit https://www.sanity.io/docs/environment-variables to leanr more about using environment variables for local & production.
  deployment: {
    autoUpdates: true,
    appId: 'kigldh2qg9kjs4h5n9hk41ar',
  },
  schemaExtraction: {
    enabled: true,
  },
  typegen: {
    path: '../web/app/utils/sanity-api/*.ts',
    generates: '../web/app/utils/sanity-api/sanity.types.ts',
    overloadClientMethods: true,
  },
})
