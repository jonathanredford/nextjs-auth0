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
      type: "string",
      validation: (Rule) => {
        return Rule.custom((currency, context) => {
          if(context?.document?.prices?.find(price => ( (price.currency === currency) && (price._key !== context.parent._key) ) ) ) {
            return `A price with the currency ${currency} already exists`
          } else {
            return true
          }
        })
      },
      options: {
        list: [
          {
            value: "AUD",
            title: "AUD"
          },
          {
            value: "NZD",
            title: "NZD"
          },
          {
            value: "USD",
            title: "USD"
          },
          {
            value: "SGP",
            title: "SGP"
          },
          {
            value: "GBP",
            title: "GBP"
          },
          {
            value: "EUR",
            title: "EUR"
          },
        ],
        layout: "dropdown"
      },
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