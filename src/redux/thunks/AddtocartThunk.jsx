import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { getImageUrl } from "../../utils/Getimagurl";
import Cookies from "js-cookie";

const loadCartFromLocal = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCartToLocal = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
const getUserData = () => JSON.parse(localStorage.getItem("userProfile"));
const isLoggedIn = () => !!getUserData();
console.log("isLoggedIn", isLoggedIn());

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
    const token = Cookies.get("token");
    console.log("Token fetched in fetchCart: ", token); // Debug log to verify token

    if (isLoggedIn() && token) {
        const res = await axiosInstance.get("/cart");
        console.log("Cart data fetched from API: ", res.data);  // Debug log to verify API response
        return res.data;
    } else {
        const cartFromLocal = loadCartFromLocal();
        console.log("Cart loaded from localStorage: ", cartFromLocal); // Debug log to verify local storage cart
        return cartFromLocal;
    }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product, { getState }) => {
    const { cart } = getState().cart;
    const userData = getUserData();
    const userId = userData?.userId;

    const existing = cart.find((item) => item.productId === product.id);
    let quantity = existing ? existing.quantity + 1 : 1;

    const updatedCart = existing
        ? cart.map((item) =>
            item.productId === product.id ? { ...item, quantity } : item
        )
        : [...cart, { ...product, quantity, productId: product.id }];

    if (userId) {
        const item = updatedCart.find((item) => item.productId === product.id);

        const payload = {
            userId,
            productId: product.id,
            productTitle: product.name,
            image: getImageUrl(product.images),
            price: product.price,
            quantity: item.quantity,
        };

        try {
            await axiosInstance.post("/cart/add", payload);
        } catch (err) {
            console.error("❌ Error adding to cart:", err);
            throw err;
        }
    } else {
        saveCartToLocal(updatedCart);
    }

    return updatedCart;
});


export const removeFromCart = createAsyncThunk("cart/remove", async (productId, { getState }) => {
    const { cart } = getState().cart;
    const userData = getUserData();
    const userId = userData?.userId;

    const updatedCart = cart.filter((item) => item.productId !== productId);

    if (isLoggedIn()) {
        try {
            console.log("Removing item from cart:", productId);
            console.log("User ID:", userId);
            await axiosInstance.delete(`/cart/remove`, {
                data: {
                    userId,
                    productId,
                }
            });
            console.log("Item removed from cart successfully.");
        } catch (err) {
            console.error("❌ Error removing from cart:", err);
        }
    } else {
        saveCartToLocal(updatedCart);
    }

    return updatedCart;
});


export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId, { getState }) => {
    const { cart } = getState().cart;
    const userData = getUserData();

    const updatedCart = cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );

    const item = updatedCart.find((item) => item.productId === productId);

    if (isLoggedIn()) {
        try {
            const payload = {
                userId: userData?.userId,
                productId: item.productId,
                quantity: item.quantity,
            };

            await axiosInstance.post("/cart/increaseQuantity", payload);
        } catch (err) {
            console.error("❌ Error increasing quantity:", err);
        }
    } else {
        saveCartToLocal(updatedCart);
    }

    return updatedCart;
});

export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async (productId, { getState }) => {
        const { cart } = getState().cart;
        const userData = getUserData();

        let updatedCart = cart
            .map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter((item) => item.quantity > 0);

        const item = cart.find((item) => item.productId === productId);

        if (isLoggedIn()) {
            try {
                if (item.quantity > 1) {
                    const payload = {
                        userId: userData?.userId,
                        cartItemId: item._id, // _id from MongoDB
                        productId: item.productId,
                        productTitle: item.name || item.productTitle,
                        image: item.image || getImageUrl(item.images),
                        price: item.price,
                        quantity: item.quantity - 1,
                    };

                    await axiosInstance.post("/cart/decreaseQuantity", payload);
                } else {
                    await axiosInstance.delete(`/cart/${productId}`);
                }
            } catch (err) {
                console.error("❌ Error decreasing quantity:", err);
            }
        } else {
            saveCartToLocal(updatedCart);
        }

        return updatedCart;
    }
);