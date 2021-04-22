import { getSession } from 'next-auth/client'
import sanityClient from '../../lib/sanityClient'

export default async (req, res) => {
    const session = await getSession({ req })
    if(!session) return res.status(401).end()

    const data = JSON.parse(req.body)
    const { user } = session
    console.log(data)
    if(!data.name) {
        return res.status(500).end()
    }

    try {
        await sanityClient
        .patch(user._id)
        .set({name: data.name})
        .commit()
        .then(updatedDoc => updatedDoc)
        .catch(err => console.log('Failed to updated user: ', err.message))
        return res.status(200).end()
    } catch(err) {
        console.log('Failed to updated user: ', err)
        return res.status(401).end()
    }
}