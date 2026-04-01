// import {FiImage} from 'react-icons/fi'
import {defineField} from 'sanity'
import {FaListUl} from 'react-icons/fa'

export default defineField({
  name: 'listProjectsUI',
  title: 'List Projects UI',
  type: 'object',
  icon: FaListUl,
  initialValue: {
    colSize: 2,
    layout: 'txt',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'colSize',
      type: 'number',
      description: 'Number of columns (1-2) on a 2 columns grid',
      hidden: true,
    }),
    defineField({
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: 'TXT', value: 'txt'},
          {title: 'IMG', value: 'img'},
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Liste de projets pour la home',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
  ],
  preview: {
    select: {
      image: 'items.0.images.0.asset',
      title: 'title',
      layout: 'layout',
    },
    prepare(selection) {
      const {title, image, layout} = selection
      return {
        title: title ? title : 'List Projects UI',
        subtitle: `List Projects UI: ${layout}`,
        media: image,
      }
    },
  },
})
