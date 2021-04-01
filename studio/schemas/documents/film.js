import { MdLocalDrink } from "react-icons/md";
import { BsFilm } from 'react-icons/bs'

export default {
  name: "film",
  title: "Film",
  type: "document",
  icon: BsFilm,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Set to published when this film should be visible on the platform"
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      description: "Enter the year of release or production year"
    },
    {
      name: "runtime",
      title: "Runtime",
      type: "number",
      description: "Duration of the film in minutes"
    },
    {
      name: "rating",
      title: "Rating",
      type: "string",
      description: "Example: PG - Mild themes and coarse language"
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
    {
      title: "Default variant",
      name: "defaultProductVariant",
      type: "productVariant",
    },
    {
      name: "prices",
      title: "Prices",
      type: "array",
      of: [
        {
          type: "price"
        }
      ],
      preview: {
        select: {
          title: "price[0].amount",
          // subtitle: "price"
        },
      }
    },
    {
      name: "geoRules",
      title: "Geo Restrictions",
      type: "geoRules",
      // description: "Only applies if countries are added in the countries field",
    },
    {
      name: "description",
      title: "Description",
      type: "localeBlockContent",
    },
    {
      title: "Portrait Image",
      name: "portraitImage",
      type: "image",
    },
    {
      title: "Landscape Image",
      name: "landscapeImage",
      type: "image",
    },
    {
      title: "Background image",
      name: "backgroundImage",
      type: "image",
    },
    
    
    // {
    //   title: "Variants",
    //   name: "variants",
    //   type: "array",
    //   of: [
    //     {
    //       title: "Variant",
    //       type: "productVariant",
    //     },
    //   ],
    // },
    // {
    //   name: "vendor",
    //   title: "Vendor",
    //   type: "reference",
    //   to: { type: "vendor" },
    // },
    
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "posterImageLandscape.image",
    },
  },
};
