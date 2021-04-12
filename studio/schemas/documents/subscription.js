import { ImLoop2 } from "react-icons/im"

export default {
  name: "subscription",
  title: "Subscription",
  type: "document",
  icon: ImLoop2,
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
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: "subscriptionPrice",
      title: "Subscription price",
      type: "array",
      of: [
        {
          type: "price"
        }
      ],
    },
    {
      name: "billingFrequency",
      title: "Billing Frequency",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          {
            value: "monthly",
            title: "Monthly"
          },
          {
            value: "quarterly",
            title: "Quarterly"
          },
          {
            value: "biannually",
            title: "Biannually"
          },
          {
            value: "annually",
            title: "Annually"
          },
        ],
        layout: "select",
      },
      description: "Choose how often the customer should be charged"
    },
    {
      name: "trailPeriod",
      title: "Trial period",
      type: "number",
      description: "Enter the number of trial days"
    },
    {
      name: "availability",
      title: "Availability",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: [
          {
            value: "private",
            title: "Private - only available by direct link"
          },
          {
            value: "public",
            title: "Public"
          },
        ],
        layout: "select",
      },
      description: "Only one subscription plan can be public"
    },
  ],
};
