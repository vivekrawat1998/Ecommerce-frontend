import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cart)
    const totalcount = cartItems.reduce((total, item) => total + item.quantity, 0)
    return (
        <Link to="/cartpage" className="relative group p-2 hover:bg-blue-400 rounded-full cursor-pointer transition-all duration-300">
            <FiShoppingCart className="h-6 w-6 text-neutral-700 group-hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {totalcount}
            </span>
        </Link>
    )
}

export default Cart
