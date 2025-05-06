import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { getImageUrl } from "../../utils/Getimagurl";
import Cookies from "js-cookie";

export const getUserData = () => JSON.parse(localStorage?.getItem("userProfile"));
console.log("User Data:", getUserData());
const isLoggedIn = () => !!getUserData();

// ✅ Load user's cart
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
    const token = Cookies.get("token");
    // console.log("Token:", token);
    if (isLoggedIn() && token) {
        const res = await axiosInstance.get(`/cart/user/${getUserData()?.userId}`);
        // console.log("Fetched Cart:", res.data);
        return res.data;

    } else {
        const cartFromLocal = JSON.parse(localStorage.getItem("guestCart")) || [];
        return cartFromLocal;
    }
});
    
// ✅ Add item to cart (for logged-in user only)
// ✅ Add item to cart (handles both logged-in and guest users)
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (product, { getState }) => {
        const userId = getUserData()?.userId;
        // console.log("User ID:", userId);
        const { cart } = getState().cart;

        const existing = cart.find((item) => item.productId === product.id);
        let quantity = existing ? existing.quantity + 1 : 1;

        const formattedProduct = {
            productId: product.id,
            productTitle: product.name,
            image: getImageUrl(product.images),
            price: product.price,
            quantity,
        };
        if (userId) {
            // ✅ This part will NOT run
            await axiosInstance.post("/cart/add", {
                ...formattedProduct,
                userId,
            });
        } else {
            // ✅ This WILL run for guest users
            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        
            const updatedGuestCart = existing
                ? guestCart.map((item) =>
                      item.productId === product.id ? { ...item, quantity } : item
                  )
                : [...guestCart, formattedProduct];
        
            localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
        }

        const updatedCart = existing
            ? cart.map((item) =>
                item.productId === product.id ? { ...item, quantity } : item
            )
            : [...cart, { ...product, quantity, productId: product.id }];

        return updatedCart;
    }
);

// ✅ Merge guest cart into server cart after login
export const mergeGuestCartWithServer = createAsyncThunk(
    "cart/mergeGuestCart",
    async () => {
        const guestCart = JSON.parse(localStorage.getItem("guestCart"));
        const userId = getUserData()?.userId;
        if (!guestCart || !userId) return;

        for (let item of guestCart) {
            const payload = {
                userId,
                productId: item.productId || item.id,
                productTitle: item.name || item.productTitle,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
            };
            try {
                await axiosInstance.post("/cart/add", payload);
            } catch (err) {
                console.error("❌ Failed to sync guest item:", payload, err);
            }
        }

        localStorage.removeItem("guestCart");
    }
);

// ✅ Remove item from cart
export const removeFromCart = createAsyncThunk(
    "cart/remove",
    async (productId, { getState }) => {
        const { cart } = getState().cart;
        const userId = getUserData()?.userId;

        if (isLoggedIn()) {
            try {
                await axiosInstance.post(`/cart/remove`, { userId, productId });
            } catch (err) {
                console.error("❌ Error removing from cart:", err);
            }
        }

        return cart.filter((item) => item.productId !== productId);
    }
);

// ✅ Increase quantity
export const increaseQuantity = createAsyncThunk(
    "cart/increaseQuantity",
    async (productId, { getState }) => {
        const { cart } = getState().cart;
        const userData = getUserData();

        const updatedCart = cart.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
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
        }

        return updatedCart;
    }
);

// ✅ Decrease quantity
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
                        cartItemId: item._id,
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
        }

        return updatedCart;
    }
);