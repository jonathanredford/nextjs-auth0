const stripe = require('stripe')('sk_test_Ea2ZuA6JuBTggG7UoCyfPPSx')
import { groq } from "next-sanity"
import { getClient, usePreviewSubscription, urlFor } from "../../utils/sanity"
import getIpdata from '../../lib/getIpdata'
import getPrices from '../../lib/getPrices'
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const session = await getSession({ req })
    const { user } = session
    const { query } = req
    const { callback_url=process.env.APP_URL, type, id} = query

    const documentPromise = new Promise(async resolve => {
        // let projection
        // switch(query.type) {
        //     case 'subscription':
        //         projection = `"pricing": {
        //             ...pricing,
        //             "oneTimePurchasePrice": {
        //                 ...pricing.oneTimePurchasePrice[country == "${proxy.country_code}"][0]
        //             }
        //         }`
        //     default:
        //         projection = `"pricing": {
        //             ...pricing,
        //             "oneTimePurchasePrice": {
        //                 ...pricing.oneTimePurchasePrice[country == "${proxy.country_code}"][0]
        //             }
        //         }`
        // }
        const groqQuery = groq`*[_id == "${id}"]{
            ...,
            "pricing": {
                ...pricing,
                "plans": [
                    ...pricing.plans[]->{
                            ...,
                            "price": [
                                ...price[]{
                                    ...,
                                    taxRate->
                                }
                            ]
                      }
                ],
                "buy": [
                    ...pricing.buy[]{
                          ...,
                          taxRate->
                      }
                ],
                    "rent": [
                    ...pricing.rent[]{
                          ...,
                          taxRate->
                      }
                ]
            },
            "siteConfig": *[_type == "siteConfig"]{
                defaultCurrency,
                defaultCountry,
                rentStartWindow,
                rentWatchWindow
            }[0]
        }[0]`
        await getClient().fetch(groqQuery).then(result => {
            resolve(result)
        })
    })

    const ipDataPromise = new Promise(async resolve => {
        const response = await getIpdata(req)
        resolve(response)
    })

    const {document, proxy} = await Promise.all([documentPromise, ipDataPromise]).then(([document, proxy]) => {
        return {
            document: document,
            proxy: proxy
        }
    })

    // return res.json(JSON.stringify({
    //     document: document,
    //     proxy: proxy
    // }, null, 2))

    if(document && proxy) {
        const { _id, _type, title, slug, verticalImage, siteConfig, pricing } = document
        const mode = query.type === 'subscribe' ? 'subscription' : 'payment'
        const sessionOptions = {
            mode: mode,
            customer: user.customerId,
            payment_method_types: ['card'],
            success_url: callback_url + '?checkout=success',
            cancel_url: callback_url + '?checkout=cancel',
            line_items: [],
            allow_promotion_codes: true,
            metadata: {
                contentId: _id,
                userId: user._id,
            }
        }
        const prices = getPrices(document, proxy)
        
        if(type === 'buy' || type === 'rent') {
    
            const { currency, amount, taxRate } = prices[type]
            const lineItem = {
                quantity: 1,
            }
            if(taxRate?.active) {
                lineItem.tax_rates = [taxRate._id]
            }
            lineItem.price_data = {
                currency: currency,
                unit_amount: Math.round(amount * 100),
                product_data: {
                    name: title,
                    description: type.charAt(0).toUpperCase() + type.slice(1), // transform first character of type to uppercase
                    images: [
                        urlFor(verticalImage)
                        .auto("format")
                        .fit("crop")
                        .width(768)
                        .quality(80)
                        .url()
                    ]
                },
            }
            sessionOptions.line_items.push(lineItem)
            sessionOptions.metadata.type = type

            if(type === 'rent') {
                sessionOptions.metadata.rentStartWindow = pricing.rentStartWindow || siteConfig.rentStartWindow
                sessionOptions.metadata.rentWatchWindow = pricing.rentWatchWindow || siteConfig.rentWatchWindow
            }
        }

        if(type === 'subscribe') {
            const { currency, amount, taxRate } = prices.plan.price
            const lineItem = {
                quantity: 1,
            }
            if(taxRate?.active) {
                lineItem.tax_rates = [taxRate._id]
            }
            lineItem.price_data = {
                currency: currency,
                unit_amount: Math.round(amount * 100),
                recurring: {
                    interval: 'month',
                    interval_count: 1
                },
                product_data: {
                    name: prices.plan.title,
                    description: type.charAt(0).toUpperCase() + type.slice(1), // transform first character of type to uppercase
                    // images: [
                    //     urlFor(verticalImage)
                    //     .auto("format")
                    //     .fit("crop")
                    //     .width(768)
                    //     .quality(80)
                    //     .url()
                    // ]
                },
            }
            sessionOptions.line_items.push(lineItem)
        }

        let session
        try {
            if(sessionOptions.line_items.length) {
                session = await stripe.checkout.sessions.create(sessionOptions)
            }
        } catch(err) {
            console.log('Error creating session', err)
        }

        if(session) {
            return res.json(JSON.stringify(session, null, 2))
        } else {
            return res.status(500).end()
        }
    }

    return res.status(500).end()
}