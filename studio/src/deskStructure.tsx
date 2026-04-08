// import {BiDockTop, BiDockBottom} from 'react-icons/bi'
// import {ControlsIcon} from '@sanity/icons'

import {ListItemBuilder} from 'sanity/structure'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'project',
    'media.tag',
    'pageModulaire',
    'infos',
    'settings',
    'person',
    'client',
    'service',
    'contribution',
    'location',
    'mux.videoAsset',
  ].includes(id)
}

export const structure = (S) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings (header, footer, ...)')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Settings (header, footer, ...)')
            .schemaType('settings')
            .documentId('settings'),
        ),
      S.divider(),

      // S.listItem()
      //   .title('Infos')
      //   .schemaType('infos')
      //   .child(S.editor().title('Infos').schemaType('infos').documentId('infos')),
      // S.divider(),

      S.listItem()
        .title('Pages')
        .schemaType('pageModulaire')
        .child(S.documentTypeList('pageModulaire')),
      // S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag')),

      S.divider(),

      S.listItem().title('Projects').schemaType('project').child(S.documentTypeList('project')),
      S.listItem().title('Services').schemaType('service').child(S.documentTypeList('service')),
      S.divider(),

      S.listItem().title('Persons').schemaType('person').child(S.documentTypeList('person')),
      S.divider(),
      S.listItem().title('Clients').schemaType('client').child(S.documentTypeList('client')),
      S.divider(),
      S.listItem().title('Locations').schemaType('location').child(S.documentTypeList('location')),
      S.divider(),

      // S.divider(),

      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
