const getIpdata = async (req, field=null, fields=['ip', 'country_code', 'currency']) => {
    const ipAddress = req.headers['x-forwarded-for'] || '122.199.1.107'

    let cookie
    if( (req.cookies?.ipData !== undefined) && (req.cookies?.ipData !== 'undefined') ) {
        cookie = JSON.parse(req.cookies.ipData || "{}")
    }

    if(cookie && cookie.ip === ipAddress) {
        return cookie
    } else {
        console.log('ipData cookie: ', cookie)
        const result = new Promise(resolve => {
            console.info(`Looking up ${ipAddress}`)
            fetch(`${process.env.APP_URL}/api/ipdata/lookup?ip=${ipAddress}`)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => {
                console.log(`Error looking up ip address: ${ipAddress}`, err)
                resolve(null)
            })
        })
        return result
    }
}

export default getIpdata