const getPlan = async (document, proxy) => {
    // const data = JSON.parse(JSON.stringify(document))
    let plan = null
    let price = null
    try {
        plan = document.pricing.plans.find(plan => plan.availability === 'public')
        price = plan.price.find(price => price.country === proxy.country_code)
        plan.price = price
    } catch(err) {
        console.log(err)
    }

    return plan
}

const getBuyPrice = (document, proxy) => {
    let price = null
    try {
        const { pricing } = document
        for(var i = 0; i < pricing.buy.length; i++) {
            if(pricing.buy[i].country === proxy?.country_code) {
                price = pricing.buy[i]
                i = pricing.buy.length
            }
        }
    } catch(err) {
        console.log('Failed to extract buy price')
    }
    return price
}

const getRentPrice = (document, proxy) => {
    let price = null
    try {
        const { pricing } = document
        for(var i = 0; i < pricing.rent.length; i++) {
            if(pricing.rent[i].country === proxy?.country_code) {
                price = pricing.rent[i]
                i = pricing.rent.length
            }
        }
    } catch(err) {
        console.log('Failed to extract rent price')
    }
    return price
}

const getPrices = (document, proxy) => {
    const plan = getPlan(document, proxy)
    const buy = getBuyPrice(document, proxy)
    const rent = getRentPrice(document, proxy)
    return {
        plan,
        buy,
        rent,
        available: plan || buy || rent ? true : false
    }
}
export default getPrices

export {
    getPlan,
    getBuyPrice,
    getRentPrice,
}