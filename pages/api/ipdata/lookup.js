import IPData from 'ipdata'

const ipdata = new IPData(process.env.IPDATA_API_KEY)

export default async (req, res) => {
    // res.setHeader('Cache-Control', 'public, s-maxage=71960, stale-while-revalidate=86400'); // 86400 = 1 day
    console.log(JSON.stringify(req.headers,null,2))
    const { query } = req
    let { ip=null, field=null, fields='ip,country_code,currency'} = query
    if(!ip) {
        ip = req.headers['x-forwarded-for']
    }
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