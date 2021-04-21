import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script src="https://cdn.jwplayer.com/libraries/TF9jylLg.js" />
                </Head>
                <body className="bg-gray-900">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument