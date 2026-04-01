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
import contactLinkItem from './objects/contactLinkItem'

// import seo from './objects/seo'
// import figure from './objects/figure'
import cta from './objects/cta'
import keyVal from './objects/keyVal'
import video from './objects/video'

/** modules */
import imagesUI from './objects/modules/imagesUI'
import textUI from './objects/modules/textUI'
import clientsUI from './objects/modules/clientsUI'
import {seoSchema} from './features/seo'
import contactsUI from './objects/modules/contactsUI'
import locationMapUI from './objects/modules/locationMapUI'
import granularStripeUI from './objects/modules/granularStripeUI'
import servicesUI from './objects/modules/servicesUI'
import listProjectsUI from './objects/modules/listProjectsUI'
import mediaUI from './objects/modules/mediaUI'

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
  contactLinkItem,
  // seo,
  video,
  cta,
  keyVal,

  listProjectsUI,
  imagesUI,
  textUI,
  clientsUI,
  contactsUI,
  locationMapUI,
  granularStripeUI,
  servicesUI,
  mediaUI,
]
export default schemaTypes
