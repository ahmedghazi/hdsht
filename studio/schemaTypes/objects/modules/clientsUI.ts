import {defineField} from 'sanity'
import {SiIcons8} from 'react-icons/si'

export default defineField({
  name: 'clientsUI',
  title: 'Clients UI',
  type: 'object',
  icon: SiIcons8,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
  ],

  preview: {
    select: {
      image: 'items.0',
      title: 'title',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title ? title : 'Clients UI',
        subtitle: 'Clients UI',
        media: image,
      }
    },
  },
})
