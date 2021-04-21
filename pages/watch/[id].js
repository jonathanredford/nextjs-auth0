import Error from 'next/error'
import { useRouter } from 'next/router'
import { getClient, usePreviewSubscription } from '../../utils/sanity'
import { useSession } from 'next-auth/client'
import LibraryPage from '../../components/LibraryPage'

const query = `//groq
    *[_type == "content" && defined(slug.current)]
`;

function ContentsPageContainer({ contentsData, preview }) {
    const [ session, loading ] = useSession()
    // console.log(session)
    const router = useRouter();

    if(loading) return null
    return <LibraryPage library={session?.user?.access?.library} />;
}

export default ContentsPageContainer;
