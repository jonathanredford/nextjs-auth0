import React from 'react'

export default {
  name: "pricing",
  title: "Pricing",
  type: "object",
  // preview: {
  //   select: {
  //     "height": "meta.height",
  //     "output_format": "output_format",
  //     "storage": "storage"
  //   },
  //   prepare: (selection) => {
  //     const { height, output_format, storage } = selection
  //     return {
  //       title: `${height}p - ${output_format}`,
  //       subtitle: `${storage.bucket}/${storage.key}/${storage.playlist}`,
  //       media: <span>▶️</span>
  //     }
  //   }
  // },
  fields: [
    {
      name: "contentAccess",
      title: "Content Access",
      type: "string",
      options: {
        list: [
          {
            value: "free",
            title: "Free for everyone"
          },
          {
            value: "restricted",
            title: "Require access"
          },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      description: "Choose to offer this content for free or require access",
    },
    {
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "subscription" },
        },
      ],
    },
    {
      name: "buy",
      title: "Buy price",
      description: "Ensure only one price per country is added. If multiple prices for a single country exist, the first price will take precedence.",
      type: "array",
      of: [
        {
          type: "price"
        }
      ],
    },
    {
      name: "rent",
      title: "Rent price",
      description: "Ensure only one price per country is added. If multiple prices for a single country exist, the first price will take precedence.",
      type: "array",
      of: [
        {
          type: "price"
        }
      ],
    },
  ],
};
