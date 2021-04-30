import { useSession } from 'next-auth/client'
import getAccess from '../lib/getAccess'
import ContentCard from './ContentCard'

function ContentsPage({ contents }) {
    const [ session, loading ] = useSession()
    return (
        <div className="container mx-auto px-6">
            <h3 className="text-gray-200 text-2xl font-medium">Films</h3>
            <span className="mt-3 text-sm text-gray-500">Be inspired.</span>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {contents.map((content) => {
                    const access = getAccess(content, session)
                    return <ContentCard key={content._id} access={access} {...content} />
                })}
            </div>
        </div>
    );
}

export default ContentsPage;
