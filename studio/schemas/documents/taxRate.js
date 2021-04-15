import React from 'react'
import { GoPrimitiveDot } from "react-icons/go"
import { getCountryByCode } from '../../../lib/data/countries'

export default {
  name: "taxRate",
  type: "document",
  title: "Taxes",
  readOnly: true,
  __experimental_actions: [],
  // icon: MdPerson,
  preview: {
    select: {
      active: 'active',
      country_code: 'country',
      percentage: 'percentage',
      description: 'description',
      display_name: 'display_name',
      inclusive: 'inclusive'
    },
    prepare: (selection) => {
      const {active, country_code, percentage, description, display_name, inclusive} = selection
      const country = getCountryByCode(country_code)
      return {
        title: `${display_name} - ${country.name} - ${percentage}% ${inclusive ? 'Inclusive' : 'Exclusive'}`,
        subtitle: `${percentage}% ${inclusive ? 'Inclusive' : 'Exclusive'}`,
        media: <div style={{
          width: '100%',
          textAlign: 'center',
          backgroundColor: active ? '#cbf4c9' : 'grey',
          color: active ? '#0e6245' : 'white',
          fontSize: '8px',
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 4
        }}>{active ? 'Active' : 'Archived'}</div>
      }
    }
  },
  fields: [
    {
      name: "active",
      type: "boolean",
      title: "Active",
    },
    {
      name: "country",
      type: "string",
      title: "Country",
    },
    {
      name: "percentage",
      type: "number",
      title: "Percentage",
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
    {
      name: "display_name",
      type: "string",
      title: "Display name",
    },
    {
      name: "inclusive",
      type: "boolean",
      title: "Inclusive",
    },
    {
      name: "jurisdiction",
      type: "string",
      title: "Jurisdiction",
    },
    {
      name: "livemode",
      type: "boolean",
      title: "Livemode",
    },
    {
      name: "metadata",
      type: "string",
      title: "Metadata",
    },
    {
      name: "state",
      type: "string",
      title: "State",
    },
  ],
};
