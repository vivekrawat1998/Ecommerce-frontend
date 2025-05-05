import React from 'react'
import { BiSolidCoupon } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
const PaymentSummary = () => {
    const cartItems = useSelector((state) => state.cart.cart);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const discount = 0;
    const deliveryCharges = 50;
    const finalAmount = totalPrice - discount + deliveryCharges;
    return (
        <div >

            {/* Coupon */}
            <div className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
                <div className="flex items-center justify-between text-lg font-medium">
                    <div className="flex items-center gap-3">
                        <BiSolidCoupon className="text-2xl text-indigo-600" />
                        Apply Coupon
                    </div>
                    <MdKeyboardArrowRight className="text-2xl" />
                </div>
            </div>

            {/* Summary */}
            <div className="border border-gray-200 rounded-2xl bg-white shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Payment Summary</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                        <span>Price of ({cartItems.length}items)</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-600">- ₹{discount.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span>₹{deliveryCharges.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between font-semibold border-t pt-3">
                        <span>Total Amount</span>
                        <span>₹{finalAmount.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between items-center pt-3 text-gray-500 text-sm">
                        <span>Items in Cart</span>
                        <span>{cartItems.length} item(s)</span>
                    </li>
                </ul>

                <button className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-3 rounded-md transition-colors">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default PaymentSummary