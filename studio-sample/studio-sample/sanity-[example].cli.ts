import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uo01rmij',
    dataset: 'production',
  },
  studioHost: 'backoffice--marie-seguret',

  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  deployment: {
    appId: 'sxzrtwen0q5z5d10ox46l2mv',
  },
})
