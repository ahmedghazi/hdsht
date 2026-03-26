import {defineField, defineType} from 'sanity'
import modulesList from '../objects/modules/modulesList'
import {StackIcon} from '@sanity/icons'
import {baseLanguage} from '../locale/supportedLanguages'
import {seoField} from '../features/seo'

export default defineType({
  name: 'pageModulaire',
  type: 'document',
  title: 'Page Modulaire',
  icon: StackIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: `title.${baseLanguage}`,
      slug: 'slug',
      homePage: 'homePage',
    },
    prepare(selection) {
      const {title, slug, homePage} = selection
      return {
        title: title,
        subtitle: homePage ? 'Home Page' : `/${slug.current}`,
      }
    },
  },

  fields: [
    seoField,
    defineField({
      name: 'homePage',
      type: 'boolean',
      title: 'Homepage? only one',
      group: 'editorial',
    }),
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Titre',
      group: 'editorial',
    }),
    defineField({
      name: 'subTitle',
      type: 'localeString',
      title: 'Soustitre',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL de la page)',
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
      name: 'color',
      type: 'color',
      title: 'Couleur',
      group: 'editorial',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Zone de contenu Modulaire (images, textes, embed)',
      type: 'array',
      of: modulesList,
      group: 'editorial',
    }),
  ],
})
