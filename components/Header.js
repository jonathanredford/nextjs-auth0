import { useEffect, useState } from 'react'
import Image from 'next/image'
import DarkModeSwitch from './DarkModeSwitch'
import {useTheme} from 'next-themes'

const Navbar = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null
    
    return (
        <div className="relative light:bg-white">
            <div className="px-4 sm:px-6 border-b-2 border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto py-6 md-justify-star md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#" className="dark:hidden flex items-center">
                            <span className="sr-only">Workflow</span>
                            {
                                theme === 'dark'
                                ? <Image className="h8 w-auto sm:h-10" src="https://assets.website-files.com/5f5ed6103fe3bd374dabb3c9/5f5ef009d38d5781dd216dab_op-logo.png" width="300" height="36" alt="" />
                                : <Image className="h8 w-auto sm:h-10" src="https://uploads-ssl.webflow.com/5f5ed6103fe3bd374dabb3c9/605d662474f81a15e1d7a4c7_Online_Premieres_Logo.png" width="300" height="36" alt="" />
                                
                            }
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-10">

                    </nav>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                            Sign in
                        </a>
                        <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white dark:text-indigo-500 bg-indigo-600 dark:bg-white hover:bg-indigo-700 dark:hover:bg-indigo-700 dark:hover:text-white">
                            Sign up
                        </a>
                        <div className="ml-8 flex items-center">
                            <DarkModeSwitch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar