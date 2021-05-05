import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import LibraryPage from '../components/LibraryPage'

function LibraryPageContainer() {
    const router = useRouter()
    const [ session, loading ] = useSession()

    if(loading) return null
    if(!session) {
        router.push('/')
        return null
    }
    return <LibraryPage library={session?.user?.access?.library} />;
}

export default LibraryPageContainer;
