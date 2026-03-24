import {defineField} from 'sanity'
import {FiAlignLeft} from 'react-icons/fi'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'textUI',
  title: 'Text',
  type: 'object',
  icon: FiAlignLeft,
  initialValue: {
    look: 'normal',
  },
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
    }),
    defineField({
      name: 'look',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: '2 colonnes', value: 'columns'},
          {title: 'LG', value: 'text-lg'},
        ],
      },
    }),
    defineField({
      name: 'text',
      type: 'localeBlockContent',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
        subtitle: 'Text UI',
      }
    },
  },
})
