import countries from '../../../lib/data/countries'

export default {
  name: "geoRules",
  title: "Geo Blocking Rules",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Block/Allow Countries",
      type: "string",
      description: "Only applies if countries are added in the countries field",
      validation: Rule => Rule.required(),
      options: {
        list: [
          {
            value: "allow",
            title: "Allow"
          },
          {
            value: "block",
            title: "Block"
          },
        ],
        layout: "radio"
      },
    },
    {
      name: "countries",
      title: "Countries",
      type: "array",
      of: [
        {type: "country"}
      ]
    },
  ],
};
