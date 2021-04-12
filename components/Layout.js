import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div className="bg-gray-900 min-h-screen">
            <Header />
            <main className="my-8">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout