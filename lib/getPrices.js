const getPlan = (content, proxy) => {
    let plan = null
    try {
        const { pricing } = content
        for(var i = 0; i < pricing.plans.length; i++) {
            if(pricing.plans[i].availability === 'public') {
                plan = pricing.plans[i]
                i = pricing.plans.length
            }
        }
        if(plan && plan.price?.length) {
            let price = null
            for(var i = 0; i < plan.price.length; i++) {
                if(plan.price[i].country === proxy.country_code) {
                    price =  plan.price[i]
                    i = plan.price.length
                }
            }
            if(price) {
                plan.price = price
            } else {
                plan = null
            }
        }
    } catch(err) {
        console.log('Failed to extract plan')
    }
    return plan
}

const getBuyPrice = (content, proxy) => {
    let price = null
    try {
        const { pricing } = content
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

const getRentPrice = (content, proxy) => {
    let price = null
    try {
        const { pricing } = content
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

const getPrices = (content, proxy) => {
    const plan = getPlan(content, proxy)
    const buy = getBuyPrice(content, proxy)
    const rent = getRentPrice(content, proxy)
    return {
        plan,
        buy,
        rent,
        avilable: plan || buy || rent ? true : false
    }
}
export default getPrices
