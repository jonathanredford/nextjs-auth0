import "../styles/index.css";
import Layout from "../components/Layout";
import '@stripe/stripe-js'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
