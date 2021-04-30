import { useSession } from 'next-auth/client'
import getAccess from '../lib/getAccess'
import ProfileForm from './ProfileForm'
import ContentCard from './ContentCard'

function LibraryPage({ library }) {
    const [ session, loading ] = useSession()
    return (
        <div className="lg:container mx-auto max-w-screen-1xl px-6">

            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="flex-none w-full lg:flex-none lg:w-96 lg:mr-6">
                    <h3 className="text-gray-200 text-2xl font-medium">My Details</h3>
                    <span className="mt-3 text-sm text-gray-500">Personalise your experience</span>

                    <div className="bg-gray-800 p-6 mt-6 mb-6 rounded-md">
                        <ProfileForm />
                    </div>
                </div>

                <div className="flex-1 md:flex-1 lg:flex-auto">
                    <h3 className="text-gray-200 text-2xl font-medium">My Library</h3>
                    <span className="mt-3 text-sm text-gray-500">Access your purchases</span>
                    
                    <div className="grid gap-x-3 sm:gap-x-6 gap-y-2  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-6">
                    {library.map((contentAccess) => {
                        const access = getAccess(contentAccess.content, session)
                        const { content } = contentAccess
                        console.log(access)
                        if(!content) return null
                        return <ContentCard key={content._id} access={access} {...content} showExpired={true} />
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LibraryPage;
