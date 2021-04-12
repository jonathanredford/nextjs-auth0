import { useContext } from 'react'
import Error from "next/error"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import ContentPage from '../components/ContentPage'
import { getClient, usePreviewSubscription, urlFor } from "../utils/sanity"
import { ProxyContext } from '../context/proxy-context'

const query = groq`*[_type == "content" && slug.current == $slug]{
    ...,
    "pricing": {
        ...pricing,
        "plans": pricing.plans[]->
    }
}[0]`

function ContentPageContainer({ contentData, preview, query }) {
    const [ proxy ] = useContext(ProxyContext)
    console.log(proxy)
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
        pricing,
        plans,
        body,
        tags,
        vendor,
        categories,
        slug,
    } = content

    const oneTimePurchasePrice = () => {
        if(!pricing?.oneTimePurchasePrice.length || !proxy?.country_code) {
            return null
        }
        let price = null
        for(var i = 0; i < pricing.oneTimePurchasePrice.length; i++) {
            if(pricing.oneTimePurchasePrice[i].country === proxy?.country_code) {
                price = pricing.oneTimePurchasePrice[i]
                i = pricing.oneTimePurchasePrice.length
            }
        }
        return price
    }

    const getPlan = () => {
        if(!pricing?.plans?.length || !proxy?.country_code) {
            return null
        }
        let plan = null
        for(var i = 0; i < pricing.plans.length; i++) {
            if(pricing.plans[i].availability === 'public') {
                plan = pricing.plans[i]
                i = pricing.plans.length
            }
        }
        if(plan && plan.subscriptionPrice.length) {
            let price = null
            for(var i = 0; i < plan.subscriptionPrice.length; i++) {
                if(plan.subscriptionPrice[i].country === proxy.country_code) {
                    price =  plan.subscriptionPrice[i]
                    i = plan.subscriptionPrice.length
                }
            }
            if(price) {
                plan.subscriptionPrice = price
            } else {
                plan = null
            }
        }
        return plan
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
                pricing={pricing}
                blurb={description}
                body={description}
                slug={slug?.current}
                content={content}
                plan={getPlan()}
                oneTimePurchasePrice={oneTimePurchasePrice()}
            />
        </>
    );
}

// export async function getServerSideProps({params, req, res, preview=false}) {
//     res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=300'); // 300 = 5 minutes
//     // const ipdata = await getIpdata(req)
//     // const query = groq`*[_type == "content" && slug.current == $slug]{
//     //     title,
//     //     ...,
//     //     "pricing": {
//     //         ...pricing,
//     //         "oneTimePurchasePrice": pricing.oneTimePurchasePrice[country == "${ipdata.country_code}"][0]
//     //     }
//     // }[0]`;

//     const contentData = await getClient(preview).fetch(query, {
//         slug: params.slug,
//     });

//     return {
//         props: { preview, contentData, query },
//     };
// }

export async function getStaticProps({ params, preview = false }) {
    const contentData = await getClient(preview).fetch(query, {
        slug: params.slug,
    });

    return {
        props: { preview, contentData },
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
