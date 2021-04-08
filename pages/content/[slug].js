import Error from "next/error"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import ProductPage from "../../components/ProductPage"
import { getClient, usePreviewSubscription, urlFor } from "../../utils/sanity"
import Json from "../../components/Json"

const query = groq`*[_type == "content" && slug.current == $slug][0]`;

function ContentPageContainer({ contentData, preview }) {
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
        landscapeImage,
        description,
        body,
        tags,
        vendor,
        categories,
        slug,
    } = content;

    const handleCheckout = async () => {
        var stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                price: parseInt(content.pricing.oneTimePurchasePrice[0].amount * 100),
                currency: content.pricing.oneTimePurchasePrice[0].currency,
                country: content.pricing.oneTimePurchasePrice[0].country,
                cancelUrl: window.location.href,
                images: [
                    urlFor(landscapeImage)
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
    return (
        <>
            <ProductPage
                id={_id}
                title={title}
                mainImage={landscapeImage}
                blurb={description}
                body={description}
                slug={slug?.current}
            />
            <div className="container mx-auto p-6">
                <button type="button" onClick={handleCheckout} className="block items-center px-4 py-2 border border-transparent rounded text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Checkout
                </button>
            </div>
            <Json json={content} />
        </>
    );
}

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
