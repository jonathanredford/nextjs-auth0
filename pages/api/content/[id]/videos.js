import { getSession } from 'next-auth/client'
import { groq } from "next-sanity"
import { getClient } from "../../../../utils/sanity"
import isRentalExpired from '../../../../lib/isRentalExpired'

const groqQuery = groq`*[_id == $id]{
    slug,
    title,
    createdAt,
    updatedAt,
    videos[]->{
        _id,
        _type,
        title,
        description,
        "playlist": output.playlist,
		"thumbnails": output.thumbnails,
        thumbnail
    }
}[0]`

export default async (req, res) => {
    const session = await getSession({ req })
    if(!session) return res.status(401).end()

    const { query } = req
    const { user } = session

    try {
        const contentAccessIndex = user.access.contentIds.indexOf(query.id)
        const contentAccess = user.access.library[contentAccessIndex]

        let watchWindowExpiry = new Date(contentAccess.createdAt)
        watchWindowExpiry.setDate(watchWindowExpiry.getDate() + watchWindowExpiry.rentalStartWindow)

        if(contentAccess.started === true && !isRentalExpired(contentAccess.expires) || !isRentalExpired(watchWindowExpiry)) {
            const contentData = await getClient().fetch(groqQuery, {
                id: query.id,
            });
            return res.json(JSON.stringify(contentData, null, 2))
        } else {
            return res.status(401).end()
        }
    } catch(err) {
        console.log(err)
        return res.status(500).end()
    }
}

