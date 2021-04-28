import { isFuture, isPast, addDays } from 'date-fns'

const getAccess = (content, session) => {
    const library = session?.user?.access?.library
    if(!library) return null
    let libraryContent = library.find(item => item.content._id === content._id)
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