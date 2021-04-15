import currencies from '../../../lib/data/currencies'

export default {
    name: "currency",
    title: "Currency",
    type: "string",
    // validation: (Rule) => {
    //     return Rule.custom((currency, context) => {
    //     if(context?.document?.prices?.find(price => ( (price.currency === currency) && (price._key !== context.parent._key) ) ) ) {
    //         return `A price with the currency ${currency} already exists`
    //     } else {
    //         return true
    //     }
    //     })
    // },
    options: {
        list: currencies,
        layout: "dropdown"
    }
}