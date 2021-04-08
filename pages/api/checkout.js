const stripe = require('stripe')('sk_test_Ea2ZuA6JuBTggG7UoCyfPPSx')

export default async (req, res) => {
    const { body } = req

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: body.cancelUrl,
        payment_method_types: ['card'],
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: body.currency,
                    product_data: {
                        name: body.title,
                        description: `${body.title} product description`,
                        images: body.images || []
                    },
                    unit_amount: body.price
                },
                tax_rates: ['txr_1HUNI2JUjQ8PcHCfctn6WwSY'],
            },
        ],
    })
    console.log(JSON.stringify(session, null, 2))
    return res.json(JSON.stringify(session, null, 2))
}