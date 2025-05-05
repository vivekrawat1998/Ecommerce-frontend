import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageWithFallback from "../../ui/Imagewithfallback";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/thunks/AddtocartThunk";
import { FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Mycart = () => {
    const cartItems = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const [removingItem, setRemovingItem] = useState(null);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleRemove = (id) => {
        setRemovingItem(id);
        setTimeout(() => {
            dispatch(removeFromCart(id));
            setRemovingItem(null);
        }, 300);
    };

    const handleQuantityChange = (action, id, currentQuantity) => {
        if (action === 'increase') {
            dispatch(increaseQuantity(id)); 
        } else if (action === 'decrease' && currentQuantity > 1) {
            dispatch(decreaseQuantity(id)); 
        }
    };

    const getImageUrl = (images) => {
        if (!images) return '/placeholder-image.jpg';

        if (Array.isArray(images)) {
            const validImage = images.find(img => img?.url);
            return validImage?.url || '/placeholder-image.jpg';
        }

        return images.url || images || '/placeholder-image.jpg';
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">My Cart</h2>
            <div className="space-y-6">
                <div
                    className="overflow-y-auto pr-4"
                    style={{
                        maxHeight: "450px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#6366f1 #e0e7ff",
                    }}
                >
                    <AnimatePresence>
                        {cartItems.map((item) => {
                            const imageUrl = getImageUrl(item.images);

                            return (
                                <motion.li
                                    key={item.productId} // Using productId for key consistency
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className={`${removingItem === item.productId ? 'opacity-50' : ''} flex flex-col sm:flex-row items-center sm:justify-between border-b border-gray-200 pb-4 gap-4`}
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <ImageWithFallback
                                            images={item.images}
                                            alt={item.productTitle} // Updated to match the prop name
                                            className="w-20 h-20 object-contain border rounded-md"
                                            loading="lazy"
                                        />
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-medium">{item.productTitle}</h3>
                                            <p className="text-gray-500 text-sm">₹{item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                            <button
                                                className="px-3 py-1 text-lg hover:bg-indigo-50 transition-colors"
                                                onClick={() => handleQuantityChange('decrease', item.productId, item.quantity)} // Use productId
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 bg-white text-sm">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="px-3 py-1 text-lg hover:bg-indigo-50 transition-colors"
                                                onClick={() => handleQuantityChange('increase', item.productId, item.quantity)} // Use productId
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="text-lg font-semibold text-gray-800 min-w-[100px] text-right">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        <button
                                            onClick={() => handleRemove(item.productId)} // Use productId
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <div className="mt-6 text-right text-lg font-semibold text-gray-700">
                    Total: ₹{totalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Mycart;
