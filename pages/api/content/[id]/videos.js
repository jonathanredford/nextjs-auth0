import { getSession } from 'next-auth/client'
import { groq } from "next-sanity"
import { getClient } from "../../../../utils/sanity"
import isExpired from '../../../../lib/isExpired'
import getAccess from '../../../../lib/getAccess'

const groqQuery = groq`*[_id == $id]{
    _id,
    slug,
    title,
    createdAt,
    updatedAt,
    "pricing": {
        ...pricing,
        "plans": [
            ...pricing.plans[]->{
                    ...,
                    "price": [
                        ...price[]{
                            ...,
                            taxRate->
                        }
                    ]
              }
        ],
    },
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

    try {
        const contentData = await getClient().fetch(groqQuery, {
            id: query.id,
        });
        const access = getAccess(contentData, session)
        if(access) {
            if(access.type === 'rent' && !access.expires) {
                return res.status(401).end()
            }
            return res.json(JSON.stringify(contentData, null, 2))
        } else {
            return res.status(401).end()
        }
    } catch(err) {
        console.log(err)
        return res.status(500).end()
    }
}

