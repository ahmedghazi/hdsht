import {defineField, defineType} from 'sanity'
import {FolderIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'
import {MdImage, MdVideoFile} from 'react-icons/md'
import {seoField} from '../features/seo'

export default defineType({
  type: 'document',
  name: 'project',
  title: 'Project',
  icon: FolderIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },

    {
      name: 'meta',
      title: 'Metadata',
    },
    {
      name: 'seo',
      title: 'SEO (google, bing, ...',
    },
  ],
  initialValue: {
    rip: false,
  },
  fields: [
    seoField,
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9',
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),

    defineField({
      name: 'imageCover',
      type: 'image',
      title: 'Image Cover',
      description: 'Visible on liste pages, project cards (largeur 1400px)',
      group: 'editorial',
    }),

    defineField({
      name: 'rip',
      type: 'boolean',
      title: 'RIP',
      group: 'meta',
    }),
    defineField({
      name: 'ID',
      type: 'string',
      title: 'ID',
      group: 'meta',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      group: 'meta',
    }),
    defineField({
      name: 'year',
      type: 'string',
      title: 'Year',
      group: 'meta',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
      group: 'meta',
    }),
    defineField({
      name: 'contributions',
      title: 'Contributions',
      type: 'array',
      of: [{type: 'contribution'}],
      group: 'meta',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      group: 'meta',
      hidden: true,
    }),
    defineField({
      name: 'metas',
      title: 'Key values',
      description: 'For example: "Role: Designer", "Special thanks to: ax, bx, cx"',
      type: 'array',
      of: [{type: 'keyVal'}],
      group: 'meta',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      group: 'editorial',
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'localeBlockContent',
      group: 'editorial',
    }),

    defineField({
      name: 'media',
      type: 'array',
      of: [
        {type: 'image', icon: MdImage},
        {type: 'mux.video', icon: MdVideoFile},
      ],
      group: 'editorial',
    }),

    // defineField({
    //   name: 'relatedProjects',
    //   title: 'Projets liés',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'project'}]}],
    //   group: 'editorial',
    // }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      slug: 'slug',
      image: 'imageCover',
      ID: 'ID',
    },
    prepare(selection) {
      const {title, slug, image, ID} = selection
      // console.log(images)
      return {
        title: `${ID} — ${title}`,
        subtitle: `/prjct/${slug.current}`,
        media: image,
      }
    },
  },
})
