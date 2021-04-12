import { Fragment } from 'react'
import {useState} from 'react'
import { urlFor, PortableText, getClient } from "../utils/sanity"
import Json from "../components/Json"

const ContentPage = (props) => {
    const [count, setCount] = useState(1)
    const handleCount = (value) => !(count === 0 && value === -1) ? setCount(count + value) : count
    const { title, defaultProductVariant, verticalImage, mainImage, landscapeImage, backgroundImage, pricing, body, content, oneTimePurchasePrice, plan } = props;
    const handleCheckout = async () => {
      var stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
              title: title,
              price: parseInt(pricing?.oneTimePurchasePrice[0].amount * 100),
              currency: pricing?.oneTimePurchasePrice[0].currency,
              country: pricing?.oneTimePurchasePrice[0].country,
              cancelUrl: window.location.href,
              images: [
                  urlFor(verticalImage)
                  .auto("format")
                  .width(200)
                  .fit("crop")
                  .quality(80)
                  .url()
              ]
          })
      })
      .then(res => res.json())
      .then(session => {
          console.log(session)
          stripe.redirectToCheckout({ sessionId: session.id })
      })
    }

    console.log(plan)

    return (
      <Fragment>
        <div className="container mx-auto px-6 pt-48">
          <div
            className="absolute top-0 left-0 right-0 min-h-screen-75 z-0 bg-no-repeat bg-cover bg-top"
            style={{backgroundImage: `url("${urlFor(backgroundImage).auto("format").width(1920).fit("crop").quality(80)}")`}}
          >
            <div className="absolute top-0 left-0 right-0 min-h-screen-75 z-0 bg-gradient-to-t from-gray-900 to-gray-900-opacity-40" />
          </div>
          <div className="relative">
            <div className="flex">
              <div className="w-52 flex-shrink-0">
                <div
                  className="rounded-md aspect-w-2 aspect-h-3 bg-cover"
                  style={{
                    backgroundImage: `url('${urlFor(verticalImage)
                      .auto("format")
                      .fit("crop")
                      .width(768)
                      .quality(80)}`,
                  }}
                />
              </div>
              <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0">
                <h3 className="text-gray-100 text-4xl">{title}</h3>

                <div className="flex items-center mt-6">
                  {
                    oneTimePurchasePrice &&
                    <button onClick={handleCheckout} className="px-8 py-2 bg-white text-gray-900 text-sm font-medium rounded  hover:text-red-700 focus:outline-none">
                      Rent ${oneTimePurchasePrice.amount}
                    </button>
                  }
                  {
                    plan &&
                    <button onClick={handleCheckout} className="ml-2 px-8 py-2 bg-red-700 text-white text-sm font-medium rounded hover:bg-gray-100 hover:text-red-700 focus:outline-none">
                      Subscribe ${plan.subscriptionPrice.amount}
                    </button>
                  }
                </div>

                <hr className="my-3 opacity-25" />
                <div className="mt-4 text-gray-300">
                  {body && <PortableText blocks={body?.en} className="text-gray-100" />}
                </div>
              </div>
            </div>

            {/* <div className="mt-5">
              <button type="button" onClick={handleCheckout} className="inline-block items-center px-4 py-2 border border-transparent rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Checkout
                </button>

                {
                    pricing?.oneTimePurchasePrice[0]
                    ? <button type="button" onClick={handleCheckout} className="inline-block items-center px-4 py-2 ml-2 border border-transparent rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {pricing.oneTimePurchasePrice[0].currency} ${pricing.oneTimePurchasePrice[0].amount}
                    </button>
                    : <h4 className="mt-2">This content is not available in your country.</h4>
                }
            </div> */}
              <Json json={content} />
            </div>
          </div>
      </Fragment>
    );
}

export default ContentPage;
