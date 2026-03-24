import { defineField, defineType } from "sanity";
import { baseLanguage } from "../locale/supportedLanguages";
import { BsCalendar2Event } from "react-icons/bs";

export default defineType({
  type: "document",
  name: "event",
  title: "Event",
  icon: BsCalendar2Event,
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
      name: "title",
      title: "Title",
      type: "localeString",
      group: "editorial",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Click GENERATE. URL based on the title (without spaces or any character other than a-z-0-9",
      options: {
        source: `title.${baseLanguage}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: "text",
      title: "Texte",
      type: "localeBlockContent",
      group: "editorial",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Lieux",
      group: "editorial",
    }),
    // defineField({
    //   name: 'date',
    //   type: 'datetime',
    //   title: 'Date',
    //   group: 'editorial',
    //   hidden: true,
    // }),
    defineField({
      name: "dateDu",
      type: "datetime",
      title: "Date du",
      group: "editorial",
    }),
    defineField({
      name: "dateAu",
      type: "datetime",
      title: "Date au",
      group: "editorial",
    }),
    defineField({
      name: "cta",
      type: "linkExternal",
      group: "editorial",
    }),
  ],

  preview: {
    select: {
      title: `title.${baseLanguage}`,
      date: "date",
      image: "imageCover",
    },
    prepare(selection) {
      const { title, date, image } = selection;
      // console.log(images)
      return {
        title: title,
        subtitle: date,
        media: image,
      };
    },
  },
});
