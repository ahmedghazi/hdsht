import {defineField} from 'sanity'
import {SiIcons8} from 'react-icons/si'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'locationMapUI',
  title: 'Location Map UI',
  type: 'object',
  icon: SiIcons8,
  initialValue: {
    colSize: 1,
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'colSize',
      type: 'number',
      description: 'Number of columns (1-2) on a 2 columns grid',
    }),
    defineField({
      name: 'map',
      type: 'image',
    }),
    defineField({
      name: 'cta',
      type: 'linkExternal',
    }),
    // defineField({
    //   name: 'items',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'string',
    //     },
    //   ],
    // }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      colSize: 'colSize',
      image: 'image',
    },
    prepare(selection) {
      const {title, colSize, image} = selection
      return {
        title: title ? title : 'Location Map UI',
        subtitle: `Location Map UI - ${colSize} columns`,
        media: image,
      }
    },
  },
})
