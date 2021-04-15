import React from 'react'
import countries, { getCountryByCode, getPriceCountryData } from '../../../lib/data/countries'
import country from './country';

export default {
  name: "price",
  title: "Price",
  type: "object",
  fields: [
    {
      name: "country",
      title: "Country",
      type: "string",
      validation: Rule => Rule.required(),
      options: {
        list: countries.map(country => ({value: country.code, title: country.name})),
        layout: "select",
        direction: "vertical"
      },
      description: "Select country"
    },
    {
      name: "currency",
      title: "Currency",
      type: "currency",
    },
    {
      name: "taxRate",
      title: "Tax rate",
      type: "reference",
      to: [{ type: "taxRate" }],
      options: {
        filter: ({document, parent, parentPath}) => {
          if(!parent.country) {
            return false
            return {
              filter: 'country == "invalid" && active == $active',
              params: {
                selectedCountry: parent.country,
                active: true
              }
            }
          } else {
            return {
              filter: 'country == $selectedCountry && active == $active',
              params: {
                selectedCountry: parent.country,
                active: true
              }
            }
          }
        }
      }
    },
    {
      name: "amount",
      type: "number",
      title: "Amount",
      description: "Enter the amount to be charged in the selected currency",
      options: {},
    },
  ],
  preview: {
    select: {
      code: "country",
      amount: "amount",
      currency: "currency", 
    },
    prepare: (selection) => {
      const { code, amount, currency } = selection
      const country = getCountryByCode(code)
      let symbol
      switch(currency) {
        case 'AUD':
          symbol = '$'
          break
        case 'NZD':
          symbol = '$'
          break
        case 'USD':
          symbol = '$'
          break
        case 'SGP':
          symbol = '$'
          break
        case 'GBP':
          symbol = '£'
          break
        case 'EUR':
          symbol = '€'
          break
        default:
          symbol = '$'
      }

      return {
        title: country?.name,
        subtitle: currency + " " + symbol + amount
      }
    }
  }
}