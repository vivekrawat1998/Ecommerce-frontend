import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeWish } from '../redux/Slice/AddwhislistSlice'
import { FiTrash2 } from 'react-icons/fi'
import ProductCard from '../ui/ProductCard'

const Whislistpage = () => {
    const dispatch = useDispatch()
    const wishlistItems = useSelector((state) => state.wish.wish)

    const handleRemove = (id) => {
        dispatch(removeWish(id))
    }

    return (
        <div className="max-w-5xl mt-32 mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your wishlist is empty 😢</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistItems.map((product) => (
                        <ProductCard showbadge={false} key={product.id} handleRemove={handleRemove} product={product} showAddToCart={false} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Whislistpage
