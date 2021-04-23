const isExpired = (expiry) => {
    const diff = new Date(expiry) - new Date()
    if(diff < 0) {
        // expiry is in the future
        return true
    }
    return false
}

export default isExpired