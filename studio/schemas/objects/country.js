import React from 'react'
import countries, { getCountryByCode } from '../../../lib/data/countries'

export default {
  name: "country",
  title: "Country",
  type: "object",
  fields: [
    {
      name: "code",
      title: "Country",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: countries.map(country => ({value: country.code, title: country.name})),
        layout: "select",
        direction: "vertical"
      },
      description: "Select countries to apply geo rules to (allow or block)"
    },
  ],
  preview: {
    select: {
      code: "code",
    },
    prepare: (selection) => {
      const { code, type } = selection
      const country = getCountryByCode(code) 
      return {
        title: country.name,
        // media: <span style={{fontSize: '1.5rem'}}>{type === 'allow' ? '✅' : '❌'}</span>
      }
    }
  }
};
