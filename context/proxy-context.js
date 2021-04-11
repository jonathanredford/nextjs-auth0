import React, { useState, useEffect, useRef, createContext } from 'react'
import Cookies from 'js-cookie'

export const ProxyContext = createContext();

export const ProxyContextProvider = (props) => {
    const initialState = {
        ip: null,
        // countryName: null,
        country_code: null,
        currency: null
        // isProxy: false,
        // proxyType: '',
    };

    // Declare shareable proxy state
    const [proxy, setProxy] = useState(initialState);
    const prev = useRef();

    // Read and Write Proxy State to Local Storage
    useEffect(() => {
        if (proxy.country_code === null) {
            let localState
            try  {
                localState = JSON.parse(Cookies.get('proxyData'))
            } catch(err) {
                console.log('proxyData not found in cookies')
            }
            if (localState) {
                console.info('reading local storage');
                prev.current = localState.ip;
                setProxy(localState);
            }
        } else if (prev.current !== proxy.ip) {
            console.info('writing local storage');
            localStorage.setItem('proxyData', JSON.stringify(proxy));
        }
    }, [proxy]);

    return (
        <ProxyContext.Provider value={[proxy, setProxy]}>
        {props.children}
        </ProxyContext.Provider>
    );
};