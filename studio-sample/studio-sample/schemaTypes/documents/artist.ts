import { defineField, defineType } from "sanity";
import modulesList from "../objects/modules/modulesList";
import { baseLanguage } from "../locale/supportedLanguages";
import { IoPersonOutline } from "react-icons/io5";

export default defineType({
  type: "document",
  name: "artist",
  title: "Artist",
  icon: IoPersonOutline,
  groups: [
    {
      default: true,
      name: "editorial",
      title: "Editorial",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "seo",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Nom",
      group: "editorial",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL de la page)",
      type: "slug",
      description:
        "Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9",
      options: {
        source: `name`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "editorial",
    }),
    defineField({
      name: "color",
      type: "color",
      title: "Couleur",
      group: "editorial",
    }),
    defineField({
      name: "imageCover",
      type: "image",
      title: "Image clef",
      description: "Visible sur les pages de liste (largeur 1400px)",
      group: "editorial",
    }),
    defineField({
      name: "imageHero",
      type: "image",
      title: "Image Hero",
      description: "grande image visible sur la page, largeur 1400px",
      group: "editorial",
    }),

    defineField({
      name: "modules",
      title: "Modules",
      description: "Zone de contenu Modulaire (images, textes, embed)",
      type: "array",
      of: modulesList,
      group: "editorial",
    }),
  ],

  preview: {
    select: {
      title: `name`,
      slug: "slug",
      image: "imageCover",
    },
    prepare(selection) {
      const { title, slug, image } = selection;
      // console.log(images)
      return {
        title: title,
        subtitle: `/artist/${slug.current}`,
        media: image,
      };
    },
  },
});
