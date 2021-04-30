import Error from 'next/error'
import { useRouter } from 'next/router'
import { groq } from "next-sanity"
import { getClient, usePreviewSubscription, urlFor } from '../../../utils/sanity'
import { useSession } from 'next-auth/client'
import LibraryPage from '../../../components/LibraryPage'
import { useEffect, useState } from 'react'
import NoLayout from '../../../components/NoLayout'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { Fragment } from 'react'
import FullscreenSpinner from '../../../components/FullscreenSpinner'

function WatchPageContainer({ preview, contentData }) {
    const [ session, loading ] = useSession()
    const [ content, setContent ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ isShown, setIsShown ] = useState(false)
    const router = useRouter();

    console.log(contentData)

    useEffect(() => {
        if(router.query.id) {
            fetchContent(router.query.id)
        }
        if(!window?.timeoutHandler) {
            window.timeoutHandler = setTimeout(() => {
                setIsShown(false)
            }, 4000)
        }
    }, [router])

    const hover = () => {
        clearTimeout(window.timeoutHandler)
        setIsShown(true)
        window.timeoutHandler = setTimeout(() => {
            setIsShown(false)
        }, 2000)
    }

    const fetchContent = async (contentId) => {
        await fetch(`/api/content/${contentId}/videos`)
            .then(res => res.json())
            .then(data => {
                setContent(data)
                initPlayer(data)
            })
            .catch(err => {
                console.log('ERROR: ', err)
                router.push(`/${router.query.slug}`)
            })
    }


    const initPlayer = (content) => {
        jwplayer('player').setup({
            playlist: content.videos.map(video => ({
                file: video.playlist,
                image: urlFor(video.thumbnail).auto("format").fit("crop").width(1920).quality(80).url(),
                title: video.title,
                tracks: [
                    {
                        file: video.thumbnails,
                        kind: 'thumbnails'
                    }
                ]
            })),
            autostart: true,
            width: '100vw',
            height: '100vh',
            stretching: 'uniform'
        });
        jwplayer('player').on('setupError', (err) => {
            console.log(err)
            setError(err)
        })
        jwplayer().on('playlistComplete', () => {
            router.push(`/${content.slug.current}`)
        })
    }


    if(loading || !content) {
        return <FullscreenSpinner className="opacity-70" background={urlFor(contentData?.thumbnail).auto("format").fit("crop").width(1920).quality(80).url()} />
    }

    if(content) {
        return (
            <Fragment>
                <div onMouseMove={() => hover()}>
                    <div id="player" />
                    <Link href={`/${content.slug.current}`}>
                        <a className={`px-4 py-1 flex items-center text-white text-2xl rounded-md hover:bg-gray-100 hover:text-gray-700 transition-bg  absolute top-6 left-12 transition duration-200 ease transition-opacity ${isShown ? 'opacity-100' : 'opacity-0'}`}>
                        <BsArrowLeft size={48} className="mr-2" /> Back
                        </a>
                    </Link>
                </div>
                {
                    error && <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div>
                            <h1 className="text-white">Playback Error: {error.message}</h1>
                            <p className="text-white block">Error code {error.code}</p>
                        </div>
                        <div className="flex justify-center mt-12">
                            <Link href={`/${content.slug.current}`}>
                                <a className="px-4 py-2 rounded-md text-gray-700 bg-white">
                                    Go Back
                                </a>
                            </Link>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }

    return null
}

WatchPageContainer.Layout = NoLayout

export async function getStaticProps({ params, preview = false }) {
    console.log(params)
    const query = groq`*[_type == "content" && slug.current == $slug][0]{
        "thumbnail": videos[0]->.thumbnail
    }`
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
        `*[_type == "content" && defined(slug.current)]{
            "slug": slug.current,
            "id": _id
        }`
    );

    console.log(paths)

    return {
        paths: paths.map((options) => ({ params: { slug: options.slug, id: options.id } })),
        fallback: true,
    };
}

export default WatchPageContainer;
