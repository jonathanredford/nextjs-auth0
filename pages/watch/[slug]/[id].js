import Error from 'next/error'
import { useRouter } from 'next/router'
import { getClient, usePreviewSubscription, urlFor } from '../../../utils/sanity'
import { useSession } from 'next-auth/client'
import LibraryPage from '../../../components/LibraryPage'
import { useEffect, useState } from 'react'
import NoLayout from '../../../components/NoLayout'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { Fragment } from 'react'

function WatchPageContainer({ preview }) {
    const [ session, loading ] = useSession()
    const [ content, setContent ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ isShown, setIsShown ] = useState(false)
    const router = useRouter();

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
    }


    if(loading || !content) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )
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

export default WatchPageContainer;
