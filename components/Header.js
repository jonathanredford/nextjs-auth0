import { useState, Fragment, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { BsPeopleCircle } from 'react-icons/bs'

const Navbar = () => {   
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMenu = () => setMenuOpen(!menuOpen) 
    const [ session, loading ] = useSession()

    useEffect(() => {

    }, [session])
    
    return (
        <header className="relative bg-gradient-to-b from-gray-900 via-gray-900-opacity-50 z-10">
            <div className="lg:container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    <div className="w-full">
                        <Link href="/">
                            <a className="flex items-center">
                                <span className="sr-only">Online Premieres Logo</span>
                                <Image className="h8 w-auto sm:h-10" src="https://assets.website-files.com/5f5ed6103fe3bd374dabb3c9/5f5ef009d38d5781dd216dab_op-logo.png" width="300" height="36" alt="" />
                            </a>
                        </Link>
                    </div>

                    

                    <div className="flex items-center justify-end w-full">
                        <nav
                            className="hidden sm:visible sm:flex sm:justify-center sm:items-center"
                        >
                            <div className="flex flex-row items-center">
                                <NavItems session={session} loading={loading} />
                            </div>
                        </nav>
                        <div className="flex sm:hidden">
                            <button
                                onClick={handleMenu}
                                type="button"
                                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-500"
                                aria-label="toggle menu"
                            >
                                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    />
                                </svg>
                            </button>
                        </div>
                        
                    </div>
                </div>

                <nav
                    className={`${
                    menuOpen ? "" : "hidden"
                    } sm:hidden sm:flex sm:justify-center sm:items-center`}
                >
                    <div className="flex flex-col sm:flex-row">
                        <NavItems session={session} loading={loading} />
                    </div>
                </nav>

            </div>
        </header>
    )
}

export default Navbar

const NavItems = ({session, loading}) => {
    // console.log(session, loading)
    if(loading) return (
        <Fragment>
            <div className="animate-pulse rounded-md mt-3 w-24 h-6 bg-gray-300 bg-opacity-25 sm:mx-1 sm:mt-0" />
            <div className="animate-pulse rounded-md mt-3 w-24 h-6 bg-gray-300 bg-opacity-25 sm:mx-1 sm:mt-0" />
            <div className="animate-pulse rounded-full mt-3 w-6 h-6 bg-gray-300 bg-opacity-25 sm:mx-1 sm:mt-0" />
        </Fragment>
    )
    return (
        <Fragment>
            <Link href="/browse">
                <a className="mt-3 text-base text-gray-300 hover:text-gray-100 sm:mx-3 sm:mt-0">
                    Browse
                </a>
            </Link>
            {
                session
                ? <Fragment>
                    <Link href="/api/auth/signout">
                        <a className="mt-3 text-base text-gray-300 hover:text-gray-100 sm:mx-3 sm:mt-0">
                            Sign out
                        </a>
                    </Link>
                    <Link href="/me">
                        <a className="text-gray-300 hover:text-gray-100 sm:mx-3 sm:mt-0">
                            <BsPeopleCircle size={24} />
                        </a>
                    </Link>
                </Fragment>
                : (
                    <Fragment>
                        <Link href="/api/auth/signin">
                            <a className="mt-3 text-base text-gray-300 hover:text-gray-100 sm:mx-3 sm:mt-0">
                                Sign in
                            </a>
                        </Link>
                        <Link href="/signup">
                            <a className="mt-3 text-base text-white sm:mx-3 sm:mt-0 px-4 py-2 border border-transparent rounded-md bg-red-700 hover:bg-red-900">
                                Sign Up
                            </a>
                        </Link>
                    </Fragment>
                )
            }
        </Fragment>
    )
}