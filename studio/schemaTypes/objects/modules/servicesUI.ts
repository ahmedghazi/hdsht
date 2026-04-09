import {defineArrayMember, defineField} from 'sanity'
import {baseLanguage} from '../../locale/supportedLanguages'
import {FaRegHandPeace} from 'react-icons/fa'

export default defineField({
  name: 'servicesUI',
  title: 'Services UI',
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
      name: 'placeholder',
      type: 'image',
    }),
    defineField({
      name: 'accordion',
      type: 'accordion',
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title ? title : 'Services UI',
        subtitle: 'Services UI',
      }
    },
  },
})
