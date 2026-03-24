import {defineField, defineType} from 'sanity'
import {FaPersonHalfDress} from 'react-icons/fa6'

export default defineType({
  type: 'document',
  name: 'person',
  title: 'Person',
  icon: FaPersonHalfDress,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'first_name',
      title: 'First Name',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9',
      options: {
        source: (doc) => `${doc.first_name} ${doc.name}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      name: `name`,
      first_name: 'first_name',
    },
    prepare(selection) {
      const {first_name, name} = selection
      return {
        title: `${first_name} ${name}`,
        subtitle: 'Person',
      }
    },
  },
})
