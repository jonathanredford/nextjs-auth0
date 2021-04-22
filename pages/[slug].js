import { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import Error from "next/error"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import ContentPage from '../components/ContentPage'
import { getClient, usePreviewSubscription, urlFor } from "../utils/sanity"
import { ProxyContext } from '../context/proxy-context'
import getPrices, { getPlan } from '../lib/getPrices'
import Json from '../components/Json'
import isRentalExpired from '../lib/isRentalExpired'

const query = groq`*[_type == "content" && slug.current == $slug]{
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
        defaultCountry
    }[0]
}[0]`

function ContentPageContainer({ contentData, preview, query }) {
    const [ proxy ] = useContext(ProxyContext)
    const [ session, loading ] = useSession()
    const [ prices, setPrices ] = useState(null)
    const [ access, setAccess ] = useState(false)

    
    const router = useRouter();
    if (!router.isFallback && !contentData?.slug) {
        return <Error statusCode={404} />;
    }

    const { data: content = {} } = usePreviewSubscription(query, {
        params: { slug: contentData?.slug?.current },
        initialData: contentData,
        enabled: preview || router.query.preview !== null,
    });

    const {
        _id,
        title,
        verticalImage,
        landscapeImage,
        backgroundImage,
        description,
        slug,
    } = content

    useEffect(() => {
        setPrices(getPrices(JSON.parse(JSON.stringify(content)), proxy))
    }, [proxy])

    useEffect(() => {
        getAccess(content, session)
    }, [session])

    const getAccess = (content, session) => {
        const library = session?.user?.access?.library
        if(!library) return
        const libraryContent = library.find(item => item.content._id === content._id)
        if(libraryContent) {
            console.log(libraryContent)
            console.log(isRentalExpired(libraryContent.expires))
            if(!isRentalExpired(libraryContent.expires)) {
                setAccess(libraryContent)
            }
        }
    }

    return (
        <>
            <ContentPage
                id={_id}
                title={title}
                verticalImage={verticalImage}
                mainImage={landscapeImage}
                landscapeImage={landscapeImage}
                backgroundImage={backgroundImage}
                blurb={description}
                body={description}
                slug={slug?.current}
                content={content}
                prices={prices}
                access={access}
            />
            {/* <Json json={content} /> */}
        </>
    );
}

// export async function getServerSideProps({params, req, res, preview=false}) {
//     // res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=240'); // 300 = 5 minutes
//     const contentData = await getClient(preview).fetch(query, {
//         slug: params.slug,
//     });

//     return {
//         props: { preview, contentData },
//     };
// }

export async function getStaticProps({ params, preview = false }) {
    const contentData = await getClient(preview).fetch(query, {
        slug: params.slug,
    });

    // console.log(JSON.stringify(contentData.pricing, null, 2))

    return {
        props: { preview, contentData },
        revalidate: 120,
    };
}

export async function getStaticPaths() {
    const paths = await getClient().fetch(
        `*[_type == "content" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
  }

export default ContentPageContainer;
