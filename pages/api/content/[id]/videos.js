import { getSession } from 'next-auth/client'
import { groq } from "next-sanity"
import { getClient } from "../../../../utils/sanity"

const groqQuery = groq`*[_id == $id]{
    videos[]->{
        _id,
        _type,
        title,
        description,
        "playlist": output.playlist,
		"thumbnails": output.thumbnails,
        thumbnail
    }
}[0].videos`

export default async (req, res) => {
    const session = await getSession({ req })
    if(!session) return res.status(401).end()

    const { query } = req
    const { user } = session

    if(user?.access?.contentIds?.indexOf(query.id) !== -1) {
        const videoData = await getClient().fetch(groqQuery, {
            id: query.id,
        });
        return res.json(JSON.stringify(videoData, null, 2))
    } else {
        return res.status(401).end()
    }
}