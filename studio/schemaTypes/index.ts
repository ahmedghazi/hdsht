import pageModulaire from './documents/pageModulaire'
import project from './documents/project'
import infos from './singletons/infos'
import client from './documents/client'
import contribution from './documents/contribution'
import person from './documents/person'
import service from './documents/service'
import location from './documents/location'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeText from './locale/localeText'
import localeBlockContent from './locale/localeBlockContent'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkIcon from './objects/linkIcon'
// import seo from './objects/seo'
// import figure from './objects/figure'
import cta from './objects/cta'
import keyVal from './objects/keyVal'
import video from './objects/video'

/** modules */
import imagesUI from './objects/modules/imagesUI'
import textUI from './objects/modules/textUI'
import listProjectsUI from './objects/modules/listProjects'
import clientsUI from './objects/modules/clientsUI'
import {seoSchema} from './features/seo'

export const schemaTypes = [
  settings,
  pageModulaire,
  project,
  infos,
  contribution,
  person,
  client,
  service,
  location,

  localeString,
  localeText,
  localeBlockContent,

  seoSchema,
  blockContent,
  linkExternal,
  linkInternal,
  linkIcon,
  // seo,
  video,
  cta,
  keyVal,

  listProjectsUI,
  imagesUI,
  textUI,
  clientsUI,
]
export default schemaTypes
