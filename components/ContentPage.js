import { Fragment, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { urlFor, PortableText, getClient } from "../utils/sanity"
import Json from "../components/Json"
import { ProxyContext } from '../context/proxy-context'
import { BsPlayFill } from 'react-icons/bs'
import ContentCardVertical from './ContentCardVertical'

const ContentPage = (props) => {
    const [ proxy ] = useContext(ProxyContext)
    const [count, setCount] = useState(1)
    const handleCount = (value) => !(count === 0 && value === -1) ? setCount(count + value) : count
    const { id, title, defaultProductVariant, verticalImage, mainImage, landscapeImage, backgroundImage, body, content, prices, access } = props;
    const router = useRouter()
    const handlePlay = () => {
        const path = `/watch/${access.content.slug.current}/${access.content._id}`
        if(access.type === 'rent' && !access.expires) {
            if(confirm('Once you start watching, you have 3 days to finish')) {
                fetch(`/api/content/${id}/start`)
                .then(res => {
                    if(res.ok) {
                        router.push(path)
                    }
                })
            }
        } else {
            router.push(path)
        }
    }

    // console.log('ACCESS: ', access)

    // const canWatch = () => {
    //     let result = false
    //     if(!access) return result
    //     if(!access.expired) result = true
    //     if()

    // }

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
                        <div className="w-52 flex-shrink-0 relative">
                            <ContentCardVertical verticalImage={verticalImage} access={access} />
                        </div>
                        <div className="w-full mx-auto mt-5 md:ml-8 md:mt-0">
                            <h3 className="text-gray-100 text-4xl">{title}</h3>

                            <div className="flex items-center mt-6">
                                
                                {
                                    !proxy.loading
                                    ? (
                                        prices?.available === true || access
                                        ? (
                                            access && !access.expired
                                            ? <button onClick={handlePlay} className=" inline-flex items-center px-4 py-2 bg-white text-sm font-medium rounded hover:text-red-700 focus:outline-none transition ease-in-out duration-150">
                                                <BsPlayFill className="mr-1" size={20} /> Play
                                            </button>
                                            : <PricingButtons contentId={id} prices={prices} />
                                        )
                                        : <div className="px-4 py-2 rounded-md bg-gray-500 bg-opacity-50 text-white text-sm flex items-center">
                                            <p className="">This content is not available in your country</p>
                                        </div>
                                    )
                                    : <div className="px-4 py-2 text-sm opacity-0 cursor-default">PLACEHOLDER</div>
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
                    {/* <Json json={content} /> */}
                </div>
            </div>
        </Fragment>
    );
}

export default ContentPage;

const PricingButtons = ({contentId, prices}) => {
    const [ proxy ] = useContext(ProxyContext)

    return (
        <Fragment>
            {
                prices?.free && <PriceButton contentId={contentId} type="free" text={`Free - Add to Library`} />
            }
            {
                prices?.rent && <PriceButton contentId={contentId} type="rent" text={`Rent ${proxy?.currency?.native}${prices.rent.amount.toFixed(2)}`} />
            }
            {
                prices?.buy && <PriceButton contentId={contentId} type="buy" className="ml-2" text={`Buy ${proxy?.currency?.native}${prices.buy.amount.toFixed(2)}`} />
            }
            {
                prices?.plan && <PriceButton contentId={contentId} type="subscribe" className="ml-2 bg-red-700 text-white hover:bg-gray-100 hover:text-red-700" text={`Subscribe ${proxy?.currency?.native}${prices.plan.price.amount.toFixed(2)}`} />
            }
        </Fragment>
    )
}

const PriceButton = ({text, contentId, type, className}) => {
    const [ isCheckingOut, setIsCheckingOut ] = useState(false)
    const handleCheckout = async (type) => {
        var stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

        setIsCheckingOut(true)

        fetch(`/api/checkout?id=${contentId}&type=${type}&callback_url=${window.location.origin}${window.location.pathname}`)
        .then(res => res.json())
        .then(session => {
            console.log(session)
            stripe.redirectToCheckout({ sessionId: session.id })
        })
        .catch(err => {
            console.log(err)
            setIsCheckingOut(false)
        })
    }

    return (
        <button
            disabled={isCheckingOut ? true : false}
            onClick={() => handleCheckout(type)}
            className={`
                inline-flex
                items-center
                px-4
                py-2
                bg-white
                text-sm
                font-medium
                rounded 
                hover:text-red-700
                focus:outline-none
                transition
                ease-in-out
                duration-150
                ${isCheckingOut ? 'cursor-not-allowed' : null}
                ${className}
            `}>
            {
                isCheckingOut && <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            }
            {text}
        </button>
    )
}
