import IPData from 'ipdata'

const ipdata = new IPData(process.env.IPDATA_API_KEY)

export default async (req, res) => {
    // res.setHeader('Cache-Control', 'public, s-maxage=71960, stale-while-revalidate=86400'); // 86400 = 1 day
    const { query } = req
    let { ip=null, field=null, fields='ip,country_code,currency'} = query
    if(!ip) {
        ip = req.headers['x-real-ip'] || '180.149.231.84'
    }

    let cookie
    try {
        cookie = JSON.parse(req.cookies.proxyData)
        console.log(`proxyData cookie found: `, JSON.stringify(cookie, null, 2))
    } catch(err) {
        console.log(`No proxyData cookie found. Looking up ${ip}`)
    }

    if(cookie && cookie.ip === ip) {
        console.log('cookie ip matches ' + ip)
        return res.json(cookie)
    } else {
        cookie && console.log('cookie ip does not match ' + ip)
        if(fields) fields = fields.split(',')
        const result = await new Promise(resolve => {
            ipdata.lookup(ip, field, fields)
            .then(info => {
                delete info.status
                resolve(info)
            })
            .catch(err => {
                console.log('Error looking up ip address: ', err)
                resolve({})
            })
        })
        return res.json(result)
    }
}