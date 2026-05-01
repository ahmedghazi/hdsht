import { modules, projectCard, projectCardMini, seo } from './fragments'

/*****************************************************************************************************
 * SETTINGS
 */
export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  ...,
  logo{
    asset->{
      url
    }
  },
  navPrimary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug,
        homePage
      },
    },

  },
  navSecondary[]{
    ...,
    _type == 'linkInternal' => {
      ...,
      link->{
        _type,
        slug,
      },
    },
  },
  logos[]{
    asset->
  }
}`

/*****************************************************************************************************
 * PAGE MODULAIRE (héritée de Lambert Lenack)
 */
export const HOME_QUERY = groq`*[_type == "pageModulaire" && homePage == true][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`

/*****************************************************************************************************
 * PAGE MODULAIRE (générique)
 */
export const PAGE_MODULAIRE_QUERY = groq`*[_type == "pageModulaire" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  modules[]{
    ${modules}
  }
}`

/*****************************************************************************************************
 * PAGE PROJECT (ancienne version, slider simple)
 */
export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  seo{
    ${seo}
  },
  imageCover{
    ...,
    asset->
  },

  ID,
  client->,
  locations[]->{
    name
  },
  contributions[]{
    _key,
    service->{
      title
    },
    contributors[]->{
      first_name,
      name
    }
  },
  media[]{
    ...,
    _type == 'image' => {
      ...
      asset->
    },
    _type == 'video' => {
      ...,
      video{
        asset->{
          playbackId
        }
      }
    },
  },
  relatedProjects[]->{
    ${projectCardMini}
  }
}`
