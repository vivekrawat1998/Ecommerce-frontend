import React, { useMemo, useState } from 'react';
import AdtocartButton from './AdtocartButton';
import WishList from '../components/Header/Wishlist';
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/thunks/AddwhishlistThunk';
import ImageWithFallback from './Imagewithfallback';
import { fetchAllProducts } from '../redux/thunks/Productthunks';

const ProductCard = ({ product, showAddToCart = true, showbadge = true, showRating = true, handleRemove }) => {

    const dispatch = useDispatch();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const formattedProduct = useMemo(() => ({
        ...product,
        id: product._id || product.id,
        rating: product.rating?.toFixed?.(1) || '0.0',
        price: Math.floor(product?.price) || 0,
        title:  product.title,
        description: product.description || '',
        images:  product.images,
    }), [product]);

    const stockCount = formattedProduct.countInStock ?? formattedProduct.stock ?? 0;

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(formattedProduct.id));
        } else {
            dispatch(addToWishlist(formattedProduct));
            dispatch(fetchAllProducts())
        }
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">
            <div className="relative">
                <ImageWithFallback
                    images={formattedProduct.images}
                    alt={formattedProduct.title}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {
                    showRating && (
                        <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full shadow text-yellow-500 font-semibold">
                            ★ {formattedProduct.rating}
                        </div>
                    )
                }

                {showbadge && (
                    <div
                        onClick={handleWishlistToggle}
                        className="absolute top-2 left-2 cursor-pointer"
                    >
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
                    {formattedProduct.title || product.name}
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
                        onClick={() => handleRemove?.(formattedProduct.id)}
                        className="bg-red-400 w-full rounded-full py-2 mt-3 text-white hover:bg-red-600 transition"
                    >
                        Remove from Wishlist
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
