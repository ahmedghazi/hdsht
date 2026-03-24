import {defineField, defineType} from 'sanity'
import {CiLocationOn} from 'react-icons/ci'

export default defineType({
  type: 'document',
  name: 'location',
  title: 'Location',
  icon: CiLocationOn,
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9',
      options: {
        source: `name`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
  ],

  preview: {
    select: {
      name: `name`,
    },
    prepare(selection) {
      const {name} = selection
      // console.log(images)
      return {
        title: name,
        subtitle: 'Location',
      }
    },
  },
})
