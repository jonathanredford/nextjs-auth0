import React, { useState, useEffect, useRef, createContext } from 'react'
import Cookies from 'js-cookie'

export const ProxyContext = createContext();

export const ProxyContextProvider = (props) => {
    const initialState = {
        ip: null,
        // countryName: null,
        country_code: null,
        currency: null,
        // isProxy: false,
        // proxyType: '',
        loading: true
    };

    // Declare shareable proxy state
    const [proxy, setProxy] = useState(initialState);
    const prev = useRef();

    // Read and Write Proxy State to Local Storage
    useEffect(async () => {
        // let localState
        // try  {
        //     localState = JSON.parse(Cookies.get('proxyData'))
        // } catch(err) {
        //     console.log('proxyData not found in cookies')
        // }
        // if (localState) {
        //     console.info('reading local storage');
        //     prev.current = localState.ip;
        //     setProxy(localState);
        // }
        
        let ipData
        try {
            ipData = await fetch('/api/ipdata/lookup')
            .then(res => res.json())
            .then(data => data)
        } catch(err) {
            console.log('Error fetching ip data')
        }
        if(ipData) {
            prev.current = ipData.ip
            ipData.loading = false
            setTimeout(() => {
                setProxy(ipData)
            }, 1000);
            Cookies.set('proxyData', JSON.stringify(ipData), {expires: 1}) // expires in 1 day
        }
    }, []);

    return (
        <ProxyContext.Provider value={[proxy, setProxy]}>
        {props.children}
        </ProxyContext.Provider>
    );
};