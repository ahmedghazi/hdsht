import {defineArrayMember, defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'
import {FaRegHandPeace} from 'react-icons/fa'

export default defineField({
  name: 'mediaUI',
  title: 'Media UI',
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
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title ? title : 'Media UI',
        subtitle: 'Media UI',
      }
    },
  },
})
