import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import emptyCartAnimation from "../json/Animation - 1745315493319.json";

import PaymentSummary from "../components/cart/PaymentSummary";
import Mycart from "../components/cart/Mycart";
import axios from "axios";
import { getUserData } from "../redux/thunks/AddtocartThunk";
import Cookies from "js-cookie";


const CartPage = () => {

    const [cart, setCart] = React.useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        axios.get(`http://localhost:9878/api/v1/cart/user/${getUserData()?.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setCart(res?.data?.cartList);
            })
            .catch((err) => {
                const storedCart = JSON.parse(localStorage.getItem("guestCart")) || [];
                setCart(storedCart);
            });
    }, []);

    const { totalPrice, finalAmount } = React.useMemo(() => {
        const totalPrice = cart?.reduce(
            (total, item) => total + item?.price * item?.quantity,
            0
        );
        const discount = 0;
        const deliveryCharges = 50;
        const finalAmount = totalPrice - discount + deliveryCharges;

        return { totalPrice, finalAmount };
    }, [cart]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            {cart?.length === 0 ? (
                <div className="col-span-12 flex flex-col items-center justify-center w-full text-center space-y-6">
                    <div className="w-64 h-64">
                        <Lottie animationData={emptyCartAnimation} loop={true} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700">Oops! Your cart is feeling lonely... 😢</h2>
                    <p className="text-gray-500 max-w-md">
                        Looks like you haven’t added anything yet. Your cart misses you already! Go ahead and make it happy 🛍
                    </p>
                    <Link
                        to="/"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-md shadow-md transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="md:col-span-7 border border-gray-300 p-6 rounded-2xl bg-white shadow-sm">
                        <Mycart cart={cart} />
                    </div>
                    <div className="md:col-span-5 space-y-6">
                        <PaymentSummary
                            totalPrice={totalPrice}
                            finalAmount={finalAmount}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
