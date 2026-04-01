import { modules, seo } from './fragments'

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
  relatedProject->{
    _type,
    slug,
    title,
  }
}`

/*****************************************************************************************************
 * NOUVELLES QUERIES — STUDIO JIMBO
 * - homeDocumentQuery : singleton `home` (manifesto + index de projets)
 * - projectWithLayoutQuery : document `project` avec layout images + colSize
 */

// // Home (singleton) : manifesto + index de projets
// export const homeDocumentQuery = groq`*[_type == "home"][0]{
//   _id,
//   _type,
//   title,
//   slug,
//   manifesto{
//     ${blockContent}
//   },
//   projectsIndex[]->{
//     _id,
//     _type,
//     slug,
//     title,
//     projectType->{
//       _id,
//       title,
//       slug,
//     },
//     year,
//     client,
//     images[]{
//       ...,
//       asset->,
//       colSize,
//     },
//   },
//   seo{
//     ${seo}
//   },
// }`;

// // Project : layout avec images + colSize
// export const projectWithLayoutQuery = groq`*[_type == "project" && slug.current == $slug][0]{
//   _id,
//   _type,
//   title,
//   slug,
//   projectType->{
//     _id,
//     title,
//     slug,
//   },
//   year,
//   client,
//   text{
//     ${blockContent}
//   },
//   images[]{
//     ...,
//     asset->,
//     colSize,
//   },
//   seo{
//     ${seo}
//   },
// }`;
