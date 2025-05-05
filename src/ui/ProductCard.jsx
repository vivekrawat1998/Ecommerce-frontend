import React, { useMemo, useState, useEffect } from 'react';
import AdtocartButton from './AdtocartButton';
import WishList from '../components/Header/Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { addtoWish, removeWish } from '../redux/Slice/AddwhislistSlice';
import ImageWithFallback from './Imagewithfallback';

const ProductCard = ({ product, showAddToCart = true, showbadge = true, handleRemove }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wish.wish);
    const isWishlisted = wishlist.some((item) => item.id === product.id);


    const formattedProduct = useMemo(() => ({
        ...product,
        rating: product.rating?.toFixed?.(1) || '0.0',
        price: product.price?.toFixed?.(2) || '0.00'
    }), [product]);

    const stockCount = formattedProduct.countInStock ?? formattedProduct.stock ?? 0;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
            <div className="relative">
                <ImageWithFallback
                    images={formattedProduct.images}
                    alt={formattedProduct.name}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full shadow text-yellow-500 font-semibold">
                    ★ {formattedProduct.rating}
                </div>

                {showbadge && (
                    <div onClick={() => dispatch(isWishlisted ? removeWish(product.id) : addtoWish(product))}
                        className="absolute top-2 left-2 cursor-pointer">
                        <WishList
                            showBadge={false}
                            iconColor={isWishlisted ? 'text-yellow-400' : 'text-red-600'}
                            wrapperStyle={`p-2 rounded-full ${isWishlisted ? 'bg-red-600' : 'bg-white'}`}
                        />
                    </div>
                )}
            </div>

            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 truncate mb-1">
                    {formattedProduct.name}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {formattedProduct.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-blue-600">
                        ${formattedProduct.price}
                    </span>
                    <span className="text-sm text-gray-500">
                        {stockCount} in stock
                    </span>
                </div>

                {showAddToCart ? (
                    <AdtocartButton product={formattedProduct} />
                ) : (
                    <button
                        onClick={() => handleRemove(formattedProduct.id)}
                        className="bg-red-400 w-full rounded-full py-2 mt-3 text-white hover:bg-red-600 transition"
                    >
                        Remove from Wishlist
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
