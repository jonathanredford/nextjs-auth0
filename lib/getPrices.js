const getPlan = (document, proxy) => {
    const { pricing } = document
    let plan = null
    let price = null
    try {
        for(var i = 0; i < pricing.plans.length; i++) {
            let p = pricing.plans[i]
            if(p.availability === 'public') {
                plan = p
                i = pricing.plans.length
            }
        }

        for(var i = 0; i < plan.price.length; i++) {
            let p = plan.price[i]
            if(p.country === proxy.country_code) {
                price = p
                i = plan.price.length
            }
        }
        
        if(plan && price) {
            plan.price = price   
        } else {
            return null
        }
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