import { isFuture, isPast, addDays } from 'date-fns'

const getAccess = (content, session) => {
    if(!session || !content) return null
    const { user } = session
    
    let subscriptionContent = content.pricing?.plans?.find(item => user.access.subscriptionIds.indexOf(item._id) !== -1)

    if(subscriptionContent) {
        return {
            content: content
        }
    }
    const library = user.access.library || []
    let libraryContent = library.find(item => item.content._id === content._id)    



    if(!libraryContent) return null
    const { type, rentWindowStartDate, rentStartWindow, rentWatchWindow, expires } = libraryContent
    if(type === 'rent') {
        if(
            !rentWindowStartDate
            || !rentStartWindow
            || !rentWatchWindow
            || (
                isPast(addDays(new Date(rentWindowStartDate), rentStartWindow||0))
                && (!expires || isPast(new Date(expires)))
            )
        ) {
            libraryContent = null
        } else {
            libraryContent.expired = isPast(new Date(expires))
        }
    }
    

    return libraryContent
}

export default getAccess