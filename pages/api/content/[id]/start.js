import { getSession } from 'next-auth/client'
import { groq } from "next-sanity"
import { getClient } from "../../../../utils/sanity"
import sanityClient from '../../../../lib/sanityClient'

const groqQuery = groq`*[_id == $userId]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    "contentAccess": access.library[content._ref == $contentId][0]
}[0]`

export default async (req, res) => {
    const session = await getSession({ req })
    if(!session) return res.status(401).end()
    const { query } = req

    try {
        const dbUser = await getClient().fetch(groqQuery, {
            contentId: query.id,
            userId: session.user._id
        })
        const { contentAccess } = dbUser
        contentAccess.started = true
        if(contentAccess.type === 'rent') {
            let date = new Date()
            date.setDate(date.getDate() + contentAccess.rentWatchWindow)
            contentAccess.expires = date
        }

        await sanityClient
            .patch(session.user._id)
            .unset([`access.library[_key == "${contentAccess._key}"]`])
            .append('access.library', [contentAccess])
            .commit()
            .catch(err => console.log('Error updating contentAccess: ', err))
        
        return res.status(200).end()

    } catch(err) {
        console.log(err)
    }
    
    return res.status(401).end()
}