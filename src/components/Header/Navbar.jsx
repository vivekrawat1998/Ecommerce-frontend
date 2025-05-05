import React from 'react'
import Searchbar from './Searchbar'
import WishList from './Wishlist'
import Cart from './Cart'
import Login from './Login'
import Categories from "../categories/Categories"
import Location from './Location'
import { Link } from 'react-router-dom'
import LogoutButton from '../../ui/Logoutbutton'
const Navbar = () => {
    return (
        <>
            <header className="bg-white shadow-sm fixed top-0 w-full z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                                ShopHub
                            </Link>
                        </div>

                        <div className="hidden md:block flex-1 max-w-2xl mx-8">
                            <Searchbar />
                        </div>
                        <div className="flex items-center gap-4">
                            <Location />
                            <Link to="/wishlist">
                                <WishList />
                            </Link>
                            <Cart />
                            <Link to="/login" className="hidden md:block">
                                <Login />
                            </Link>
                            <LogoutButton />
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden space-y-4 py-4">
                        <Searchbar />
                    </div>
                </nav>
                <div className="">
                    <Categories />
                </div>
            </header>

        </>
    )
}

export default Navbar