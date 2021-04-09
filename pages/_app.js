import App from 'next/app'
import "../styles/index.css";
import Layout from "../components/Layout";
import '@stripe/stripe-js'
import getIpdata from '../lib/getIpdata'
import Cookies from 'js-cookie'

function MyApp({ Component, pageProps }) {
    Cookies.set('ipData', JSON.stringify(pageProps.ipData), {expires: 1}) // expires in 1 day
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    const { ctx: { req, res } } = appContext
    const ipdata = await getIpdata(req)
    // console.log(ipdata)
    if(ipdata) {
        appProps.pageProps.ipData = ipdata
    }
    return {...appProps}
}

export default MyApp;
