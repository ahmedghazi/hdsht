import {defineField} from 'sanity'
import {SiIcons8} from 'react-icons/si'
import {baseLanguage} from '../../locale/supportedLanguages'

export default defineField({
  name: 'granularStripeUI',
  title: 'Granular Stripe UI',
  type: 'object',
  icon: SiIcons8,
  initialValue: {
    colSize: 2,
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
      name: 'image',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      image: 'image',
    },
    prepare(selection) {
      const {title, image} = selection
      return {
        title: title ? title : 'Granular Stripe UI',
        subtitle: 'Granular Stripe UI',
        media: image,
      }
    },
  },
})
