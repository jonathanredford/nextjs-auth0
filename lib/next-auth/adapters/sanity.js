// import { getClient } from "../../../utils/sanity"
// import { groq } from "next-sanity"
import { createHash, randomBytes } from 'crypto'
import sanityClient from '../../sanityClient'

const Adapter = (config, options = {}) => {

    async function getAdapter (appOptions) {
        function _debug(debugCode, ...args) {
            // console.info(`sanity_${debugCode}`, ...args)
        }

        const defaultSessionMaxAge = 30 * 24 * 60 * 60 * 1000
        const sessionMaxAge =
        appOptions && appOptions.session && appOptions.session.maxAge
            ? appOptions.session.maxAge * 1000
            : defaultSessionMaxAge
        const sessionUpdateAge =
        appOptions && appOptions.session && appOptions.session.updateAge
            ? appOptions.session.updateAge * 1000
            : 0
  
        async function createUser (profile) {
            _debug('createUser', profile)
            let newUser
            try {
                newUser = await sanityClient.create({
                    _type: 'user',
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                    emailVerified: false,
                    username: profile.username,
                })
                newUser.id = newUser._id
                // console.log('createUser result: ', newUser)
                return newUser
            } catch(error) {
                // console.error('CREATE_USER', error)
                return Promise.reject(new Error('CREATE_USER'))
            }
        }
    
        async function getUser (id) {
            _debug('getUser', id)
            const query = `*[_type == "user" && _id == $id]{
                ...,
                "access": {
                    ...access,
                    "subscription": access.subscription[]{
                        _id,
                        _type,
                        availability,
                        billingFrequency,
                        description,
                        slug,
                        title,
                        trialPeriod
                    },
                    "library": access.library[
                        defined(content)
                        && defined(type)
                    ]{
                        ...,
                        content->{
                                _id,
                            _type,
                            slug,
                            title,
                            type,
                            verticalImage,
                            landscapeImage,
                            backgroundImage
                        }
                    },
                    "contentIds": access.library[].content->._id
                }
            }[0]`
            let user
            try {
                user =  await sanityClient.fetch(query, {
                    id: id
                })
                // console.log('getUser result: ', JSON.stringify(user, null, 2))
                return user
            } catch(error) {
                // console.error('GET_USER', error)
                return Promise.reject(new Error('GET_USER'))
            }
        }
    
        async function getUserByEmail (email) {
            _debug('getUserByEmail', email)
            const query = `*[_type == "user" && email == $email][0]`
            let user
            try {
                user = await sanityClient.fetch(query, {
                    email: email
                })
                // console.log('getUserByEmail result: ', user)
                return user
            } catch(error) {
                // console.error('GET_USER_BY_EMAIL', error)
                return Promise.reject(new Error('GET_USER_BY_EMAIL'))
            }
        }
    
        async function getUserByProviderAccountId (
            providerId,
            providerAccountId
        ) {
            _debug('getUserByProviderAccountId', providerId, providerAccountId)
            const query = `*[_type == "account" && providerId == $providerId && providerAccountId == $providerAccountId][0]`
            let account
            try {
                account = await sanityClient.fetch(query, {
                    providerId: providerId,
                    providerAccountId: providerAccountId
                })
                // console.log('getUserByProviderAccountId result: ', account)
                return account
            } catch(error) {
                // console.error('GET_USER_BY_PROVIDER_ACCOUNT_ID', error)
                return Promise.reject(new Error('GET_USER_BY_PROVIDER_ACCOUNT_ID'))
            }
        }
        
        // Not yet required or invoked
        async function getUserByCredentials (credentials) {
            // console.log('getUserByCredentials')
            return null
        }
    
        async function updateUser (user) {
            _debug('updateUser', user)
            let updatedUser
            try {
                updatedUser = await sanityClient
                .patch(user._id)
                .set({
                    name: profile.name,
                    email: profile.email,
                    image: profile.image,
                    emailVerified: false,
                    username: profile.username,
                })
                .commit()
                .then(updatedUser => updatedUser)
                // console.log('updateUser result: ', updatedUser)
                return updatedUser
            } catch(error) {
                // console.error('UPDATE_USER_ERROR', error)
                return Promise.reject(new Error('UPDATE_USER_ERROR'))
            }
        }
    
        async function deleteUser (userId) {
            _debug('deleteUser', userId)
            try {
                await sanityClient.delete(user.id)
            } catch(error) {
                // console.error('DELETE_USER_ERROR', error)
                return Promise.reject(new Error('DELETE_USER_ERROR'))
            }
        }
    
        async function linkAccount (
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires
        ) {
            _debug(
                'linkAccount',
                userId,
                providerId,
                providerType,
                providerAccountId,
                refreshToken,
                accessToken,
                accessTokenExpires
            )
            let account
            try {
                account = await sanityClient.create({
                    _type: 'account',
                    userId: userId,
                    providerId: providerId,
                    providerType: providerType,
                    providerAccountId: providerAccountId,
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                    accessTokenExpires: accessTokenExpires,
                })
                // console.log('linkAccount result: ', account)
                return account
            } catch(error) {
                // console.error('LINK_ACCOUNT_ERROR', error)
                return Promise.reject(new Error('LINK_ACCOUNT_ERROR'))
            }
        }
    
        async function unlinkAccount (
            userId,
            providerId,
            providerAccountId
        ) {
            // console.log('unlinkAccount')
            return null
        }
    
        async function createSession (account) {
            _debug('createSession', account)
            let expires = false
            if (sessionMaxAge) {
                const dateExpires = new Date()
                dateExpires.setTime(dateExpires.getTime() + sessionMaxAge)
                expires = dateExpires.toISOString()
            }
            let session
            try {
                session = await sanityClient.create({
                    _type: 'session',
                    userId: account.userId,
                    expires: expires,
                    sessionToken: randomBytes(32).toString('hex'),
                    accessToken: randomBytes(32).toString('hex'),
                })
                // console.log('createSession result: ', session)
                return session
            } catch(error) {
                // console.error('CREATE_SESSION_ERROR', error)
                return Promise.reject(new Error('CREATE_SESSION_ERROR'))
            }
        }
    
        async function getSession (sessionToken) {
            _debug('getSession', sessionToken)
            const query = `*[_type == "session" && sessionToken == $sessionToken][0]`
            let session
            try {
                session = await sanityClient.fetch(query, {
                    sessionToken: sessionToken
                })
                // Check session has not expired (do not return it if it has)
                if (session && session.expires && new Date() > session.expires) {
                    await _deleteSession(sessionToken)
                    return null
                }
                // console.log('getSession result: ', session)
                return session
            } catch(error) {
                // console.error('GET_SESSION_ERROR', error)
                return Promise.reject(new Error('GET_SESSION_ERROR'))
            }
        }
    
        async function updateSession (
            session,
            force
        ) {
            _debug('updateSession', session)
            let updateSession
            try {
                const shouldUpdate =
                    sessionMaxAge &&
                    (sessionUpdateAge || sessionUpdateAge === 0) &&
                    session.expires
                if (!shouldUpdate && !force) {
                    return null
                }

                // Calculate last updated date, to throttle write updates to database
                // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
                //     e.g. ({expiry date} - 30 days) + 1 hour
                //
                // Default for sessionMaxAge is 30 days.
                // Default for sessionUpdateAge is 1 hour.
                const dateSessionIsDueToBeUpdated = new Date(session.expires)
                dateSessionIsDueToBeUpdated.setTime(
                    dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
                )
                dateSessionIsDueToBeUpdated.setTime(
                    dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
                )

                // Trigger update of session expiry date and write to database, only
                // if the session was last updated more than {sessionUpdateAge} ago
                const currentDate = new Date()
                if (currentDate < dateSessionIsDueToBeUpdated && !force) {
                return null
                }

                const newExpiryDate = new Date()
                newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge)
                
                updateSession = await sanityClient
                    .patch(session._id)
                    .set({
                        expires: newExpiryDate.toISOString(),
                    })
                    .commit()
                    .then(res => res)
                // console.log('updateSession result: ', updatedSession)
                return updateSession
            } catch(error) {
                // console.error('UPDATE_SESSION_ERROR', error)
                return Promise.reject(new Error('UPDATE_SESSION_ERROR'))
            }
        }
    
        async function deleteSession (sessionToken) {
            _debug('deleteSession', sessionToken)
            let session
            try {
                const query = `*[_type == "session" && sessionToken == $sessionToken][0]`
                session = await sanityClient.fetch(query, {
                    sessionToken: sessionToken
                })
                await sanityClient.delete(session._id)
            } catch(error) {
                // console.error('DELETE_SESSION_ERROR', error)
                return Promise.reject(new Error('DELETE_SESSION_ERROR'))
            }
        }
    
        async function createVerificationRequest (
            identifier,
            url,
            token,
            secret,
            provider
        ) {
            // console.log('createVerificationRequest')
            return null
        }
    
        async function getVerificationRequest (
            identifier,
            token,
            secret,
            provider
        ) {
            // console.log('getVerificationRequest')
            return null
        }
    
        async function deleteVerificationRequest (
            identifier,
            token,
            secret,
            provider
        ) {
            // console.log('deleteVerificationRequest')
            return null
        }
    
        return {
            createUser,
            getUser,
            getUserByEmail,
            getUserByProviderAccountId,
            getUserByCredentials,
            updateUser,
            deleteUser,
            linkAccount,
            unlinkAccount,
            createSession,
            getSession,
            updateSession,
            deleteSession,
            createVerificationRequest,
            getVerificationRequest,
            deleteVerificationRequest
        }
    }
  
    return {
      getAdapter
    }
  }
  
  export default {
    Adapter
  }