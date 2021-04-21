import Error from 'next/error'
import { useRouter } from 'next/router'
import { getClient, usePreviewSubscription, urlFor } from '../../utils/sanity'
import { useSession } from 'next-auth/client'
import LibraryPage from '../../components/LibraryPage'
import { useEffect, useState } from 'react'
import NoLayout from '../../components/NoLayout'

function WatchPageContainer({ contentsData, preview }) {
    const [ session, loading ] = useSession()
    const [ videos, setVideos ] = useState(null)
    // console.log(session)
    const router = useRouter();

    useEffect(() => {
        if(router.query.id) {
            fetchVideos(router.query.id)
        }
        
    }, [router])

    const fetchVideos = async (contentId) => {
        await fetch(`/api/content/${contentId}/videos`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVideos(data)
                initPlayer(data)
            })
            .catch(err => {
                // console.log('ERROR: ', err)
                router.push('/')
            })
    }

    const initPlayer = (videos) => {
        jwplayer('player').setup({
            playlist: videos.map(video => ({
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
    }


    if(loading || !videos) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        )
    }

    return <div id="player" />
}

WatchPageContainer.Layout = NoLayout

export default WatchPageContainer;
