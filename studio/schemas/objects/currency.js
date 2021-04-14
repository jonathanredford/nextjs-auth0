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
            value: "SGD",
            title: "SGD"
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
    }
}