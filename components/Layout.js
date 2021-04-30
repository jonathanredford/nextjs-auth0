import Header from './Header'
import Footer from './Footer'
import { Fragment } from 'react'
import { useSession } from 'next-auth/client'
import FullscreenSpinner from './FullscreenSpinner'

const Layout = ({ children }) => {
    const [ session, loading ] = useSession()
    return (
        <Fragment>
            {
                loading && <FullscreenSpinner className="opacity-100" />
            }
            <Header />
            <main className="my-8">{children}</main>
            <Footer />
        </Fragment>
    );
}

export default Layout