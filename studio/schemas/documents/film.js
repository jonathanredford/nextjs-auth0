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
      title: "Portrait Poster image",
      name: "posterImagePortrait",
      type: "image",
    },
    {
      title: "Landscape Poster image",
      name: "posterImageLandscape",
      type: "image",
    },
    {
      title: "Background image",
      name: "backgroundImage",
      type: "image",
    },
    {
      name: "description",
      title: "Description",
      type: "localeBlockContent",
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
