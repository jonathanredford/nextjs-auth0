import IPData from 'ipdata'

let ipdataPromise

const getIpdata = (req, field=null, fields=['ip', 'country_code', 'currency']) => {
    const ipdata = new IPData(process.env.NEXT_PUBLIC_IPDATA_API_KEY)
    const ipAddress = req.headers['x-forwarded-for'] || '122.199.1.107'

    let cookie
    if( (req.cookies.ipData !== undefined) && (req.cookies.ipData !== 'undefined') ) {
        cookie = JSON.parse(req.cookies.ipData || "{}")
    }

    if(cookie && cookie.ip === ipAddress) {
        return cookie
    } else if(!ipdataPromise) {
        ipdataPromise = new Promise((resolve, reject) => {
            console.info(`Looking up ${ipAddress}`)
            ipdata.lookup(ipAddress, field, fields)
            .then(info => {
                delete info.status
                resolve(info)
            })
            .catch(err => {
                console.log('Error looking up ip address: ', err)
                resolve({})
            })
        })
    }
    return ipdataPromise
}

export default getIpdata