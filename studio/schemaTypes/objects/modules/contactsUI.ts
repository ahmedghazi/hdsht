import {defineArrayMember, defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'
import {FaRegHandPeace} from 'react-icons/fa'

export default defineField({
  name: 'contactsUI',
  title: 'Contacts UI',
  type: 'object',
  icon: FaRegHandPeace,
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
      name: 'text',
      type: 'localeBlockContent',
    }),

    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'contactLinkItem'}],
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title ? title : 'Contacts UI',
        subtitle: 'Contacts UI',
      }
    },
  },
})
