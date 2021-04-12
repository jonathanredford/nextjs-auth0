import Link from 'next/link'

const Footer = () => {       
    return (
        <footer className="bg-gray-900">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/">
                    <a className="text-xl font-bold text-gray-500 hover:text-gray-400">
                        Movies Change People
                    </a>
                </Link>
                <p className="py-2 text-gray-500 sm:py-0">© 2021 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer