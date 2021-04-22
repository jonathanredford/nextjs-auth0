import App from 'next/app'
import "../styles/index.css";
import Layout from "../components/Layout";
import '@stripe/stripe-js'
// import getIpdata from '../lib/getIpdata'
// import Cookies from 'js-cookie'
import { ProxyContextProvider } from '../context/proxy-context'
import { Provider } from 'next-auth/client'
import ToastProvider from '../components/Toast'

function MyApp({ Component, pageProps }) {
    const ActiveLayout = Component.Layout || Layout
    // Cookies.set('proxyData', JSON.stringify(pageProps.proxyData), {expires: 1}) // expires in 1 day
    return (
        <ProxyContextProvider>
            <Provider>
                <ActiveLayout>
                    <Component {...pageProps} />
                </ActiveLayout>
            </Provider>
            <ToastProvider />
        </ProxyContextProvider>
    );
}

// MyApp.getInitialProps = async (appContext) => {
//     const appProps = await App.getInitialProps(appContext)
//     const { ctx: { req, res } } = appContext
//     const proxyData = await getIpdata(req)
//     if(proxyData) {
//         appProps.pageProps.proxyData = proxyData
//     }
//     return {...appProps}
// }

export default MyApp;
