import pageModulaire from './documents/pageModulaire'
import artist from './documents/artist'
import event from './documents/event'
import settings from './singletons/settings'

import localeString from './locale/localeString'
import localeText from './locale/localeText'
import localeBlockContent from './locale/localeBlockContent'

import blockContent from './objects/blockContent'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import linkIcon from './objects/linkIcon'
import seo from './objects/seo'
import figure from './objects/figure'
import embed from './objects/embed'
import cta from './objects/cta'

import imagesUI from './objects/modules/imagesUI'
import textUI from './objects/modules/textUI'
import textImageUI from './objects/modules/textImageUI'
import sliderUI from './objects/modules/sliderUI'
import sliderItem from './objects/modules/sliderItem'
import eventFeaturedUI from './objects/modules/eventFeaturedUI'
import eventsUI from './objects/modules/eventsUI'
import heroUI from './objects/modules/heroUI'
import playlistUI from './objects/modules/playlistUI'
import clientsUI from './objects/modules/clientsUI'
import artistsUI from './objects/modules/artistsUI'
import artistsFeaturedUI from './objects/modules/artistsFeaturedUI'
import artistFeaturedUI from './objects/modules/artistFeaturedUI'
import agendaUI from './objects/modules/agendaUI'
import titleUI from './objects/modules/titleUI'
import playUI from './objects/modules/playUI'

export const schemaTypes = [
  settings,
  pageModulaire,
  artist,
  event,

  localeString,
  localeText,
  localeBlockContent,

  blockContent,
  linkExternal,
  linkInternal,
  linkIcon,
  seo,
  embed,
  figure,
  cta,

  imagesUI,
  titleUI,
  textUI,
  textImageUI,
  sliderUI,
  sliderItem,
  eventFeaturedUI,
  eventsUI,
  agendaUI,
  heroUI,
  playlistUI,
  clientsUI,
  artistsUI,
  artistsFeaturedUI,
  artistFeaturedUI,
  playUI,
]
export default schemaTypes
