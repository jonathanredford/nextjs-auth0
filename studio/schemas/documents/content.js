import { MdVideoLibrary } from "react-icons/md"

export default {
  name: "content",
  title: "Content",
  type: "document",
  icon: MdVideoLibrary,
  initialValue: {
    _type: "content",
    pricing: {
      _type: "pricing",
      contentAccess: "restricted"
    }
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "localeBlockContent",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          {
            value: "movie",
            title: "Movie"
          },
          {
            value: "series",
            title: "Series"
          },
          {
            value: "bonus",
            title: "Bonus"
          },
          {
            value: "other",
            title: "Other"
          },
        ]
      }
    },
    {
      name: "genres",
      title: "genres",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "genre" },
        },
      ],
    },
    // {
    //   name: "geoRules",
    //   title: "Geo Restrictions",
    //   type: "geoRules",
    //   // description: "Only applies if countries are added in the countries field",
    // },
    {
      name: "pricing",
      title: "Pricing",
      type: "pricing",
    },
    {
      title: "Vertical Image",
      name: "verticalImage",
      description: "Recommended size: 2000 x 3000 (2:3)",
      type: "image",
      validation: Rule => Rule.required(),
    },
    {
      title: "Landscape Image",
      name: "landscapeImage",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
      validation: Rule => Rule.required(),
    },
    {
      title: "Background image",
      name: "backgroundImage",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
      validation: Rule => Rule.required(),
    },
    {
      name: "trailers",
      title: "Trailers",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "video" },
          options: {
            filter: "type == $type && defined(output.playlist)",
            filterParams: {type: "trailer"}
          }
        },
      ]
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "video" },
          options: {
            filter: 'defined(output.playlist)',
            // filterParams: {role: 'director'}
          }
        },
      ],
      validation: Rule => Rule.required().unique(),
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "landscapeImage",
    },
  },
};
