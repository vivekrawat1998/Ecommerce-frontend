import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/thunks/AddtocartThunk';
import { fetchAllProducts } from '../redux/thunks/Productthunks';

const AddToCartButton = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        try {
            dispatch(addToCart(product));
            dispatch(fetchAllProducts())
        } catch (err) {
            console.error("Error dispatching addToCart action", err);
        }
    };

    return (
        <button
            className="mt-4 w-full bg-gray-900 text-white text-sm py-3 transition-colors hover:bg-gray-800"
            onClick={handleAddToCart}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
