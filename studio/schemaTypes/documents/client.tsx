import {defineField, defineType} from 'sanity'
import {FaEuroSign} from 'react-icons/fa'

export default defineType({
  type: 'document',
  name: 'client',
  title: 'Client',
  icon: FaEuroSign,

  fields: [
    defineField({
      name: 'name',
      title: 'name',
      type: 'string',
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
    }),
    defineField({
      name: 'backgroundColor',
      type: 'color',
    }),
    defineField({
      name: 'foregroundColor',
      type: 'color',
    }),
  ],

  preview: {
    select: {
      name: `name`,
      backgroundColor: 'backgroundColor.hex',
      foregroundColor: 'foregroundColor.hex',
    },
    prepare(selection) {
      const {name, backgroundColor, foregroundColor} = selection
      return {
        title: name,
        subtitle: 'Client',
        media: () => (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle at center, ${foregroundColor ?? '#e5e7eb'}, ${backgroundColor ?? '#000'})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              fontWeight: 700,
              fontSize: 16,
              color: foregroundColor ?? '#000',
            }}
          >
            {/* {name?.charAt(0).toUpperCase()} */}
          </div>
        ),
      }
    },
  },
})
