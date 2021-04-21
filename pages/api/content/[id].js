import { getSession } from 'next-auth/client'
import { groq } from "next-sanity"
import { getClient, usePreviewSubscription, urlFor } from "../../../utils/sanity"

const groqQuery = groq`*[_id == $id][0]`

export default async (req, res) => {
    const session = await getSession({ req })
    const { query } = req
    const contentData = await getClient().fetch(groqQuery, {
        id: query.id,
    });
    // console.log(contentData)

    return res.json(JSON.stringify(contentData, null, 2))
    return res.json(JSON.stringify({
        query: query,
        session: session,
        contentData: contentData
    }, null, 2))
}