import {defineField, defineType} from 'sanity'
import {GiTeamIdea} from 'react-icons/gi'
import {baseLanguage} from '../locale/supportedLanguages'

export default defineType({
  type: 'document',
  name: 'contribution',
  title: 'Contribution',
  icon: GiTeamIdea,

  fields: [
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'contributors',
      title: 'contributors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
  ],

  preview: {
    select: {
      title: `service.title.${baseLanguage}`,
      contributor0: 'contributors.0.name',
      contributor1: 'contributors.1.name',
      contributor2: 'contributors.2.name',
      contributors: 'contributors',
    },
    prepare(selection) {
      const {title, contributors, contributor0, contributor1, contributor2} = selection
      const names = [contributor0, contributor1, contributor2].filter(Boolean)
      return {
        title,
        subtitle: `${names.join(', ')}${contributors.length > 3 ? ', ...' : ''}`,
      }
    },
  },
})
