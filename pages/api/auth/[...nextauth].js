import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from '../../../lib/next-auth/adapters'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // ...add more providers here
    ],
    adapter: Adapters.Sanity.Adapter(),
    callbacks: {
        async signIn(user, account, profile) {
            return true
        },
        async redirect(url, baseUrl) {
            return baseUrl
        },
        async session(session, user) {
            // console.log('SESSION CALLBACK', session, user)
             if(session.user?.email) {
                 session.user._id = user._id
                 session.user.access = user.access
             }
            //  console.log(session)
            return session
        },
        async jwt(token, user, account, profile, isNewUser) {
            return token
        }
    },
    debug: false
})