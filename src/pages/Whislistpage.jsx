import React, { useEffect, useState } from 'react';
import ProductCard from '../ui/ProductCard';
import axios from 'axios';
import { getUserData } from '../redux/thunks/AddtocartThunk';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/thunks/AddwhishlistThunk';
import { fetchAllProducts } from '../redux/thunks/Productthunks';

const Whislistpage = () => {
    const [wish, setWish] = useState([]);
    const dispatch = useDispatch();

    const fetchWishlist = async () => {
        try {
            const token = Cookies.get("token");
            const userId = getUserData()?.userId;

            const res = await axios.get(`http://localhost:9878/api/v1/wish/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const wishlistItems = res?.data?.wishlist || [];
            console.log(wishlistItems)
            setWish(wishlistItems);
            dispatch(fetchAllProducts())
        } catch (err) {
            const storedWish = JSON.parse(localStorage.getItem("guestWish")) || [];
            setWish(storedWish);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        const token = Cookies.get("token");

        if (token) {
            await dispatch(removeFromWishlist(productId));
        } else {
            const guestWish = JSON.parse(localStorage.getItem("guestWish")) || [];
            const updatedWish = guestWish.filter(item => item.productId !== productId);
            localStorage.setItem("guestWish", JSON.stringify(updatedWish));
        }

        setWish(prev => prev.filter(p => (p._id || p.id) !== productId));
    };

    return (
        <div className="max-w-5xl mt-32 mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {wish.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your wishlist is empty 😢</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wish?.map((product) => (
                        <ProductCard
                            key={product._id || product.id}
                            product={product}
                            showAddToCart={false}
                            showbadge={false}
                            showRating={false}
                            handleRemove={handleRemove}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Whislistpage;
