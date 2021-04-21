import { useSession } from 'next-auth/client'
import LibraryPage from '../components/LibraryPage'

function LibraryPageContainer({ contentsData, preview }) {
  const [ session, loading ] = useSession()

  if(loading) return null
  return <LibraryPage library={session?.user?.access?.library} />;
}

export default LibraryPageContainer;
