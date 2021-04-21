import Header from './Header'
import Footer from './Footer'
import { Fragment } from 'react';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <main className="my-8">{children}</main>
            <Footer />
        </Fragment>
    );
}

export default Layout