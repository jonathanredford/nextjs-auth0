const getIpdata = async (req) => {
    const ip = req.headers['x-forwarded-for'] || '122.199.1.107'

    let cookie
    try {
        cookie = JSON.parse(req.cookies.proxyData)
    } catch(err) {
        console.log('proxyData cookie not in header cookies')
    }

    if(cookie && cookie.ip === ip) {
        console.log('Returning cookie')
        return cookie
    } else {
        const result = await new Promise(resolve => {
            try {
                fetch(`${process.env.APP_URL}/api/ipdata/lookup?ip=${ip}`)
                .then(res => res.json())
                .then(data => resolve(data))
            } catch(err) {
                console.log(`Error looking up ip address: ${ip}`, err)
                resolve(null)
            }
        })
        return result
    }
}

export default getIpdata