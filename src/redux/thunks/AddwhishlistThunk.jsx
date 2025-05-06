import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { getImageUrl } from "../../utils/Getimagurl";

export const getUserData = () => JSON.parse(localStorage?.getItem("userProfile"));
// console.log("User Data:", getUserData());
// const isLoggedIn = () => !!getUserData();

// ✅ Load user's wish
// export const fetchwish = createAsyncThunk("wish/fetch", async () => {
//     const token = Cookies.get("token");
//     console.log("Token:", token);
//     if (isLoggedIn() && token) {
//         const res = await axiosInstance.get(`/wish/user/${getUserData()?.userId}`);
//         console.log("Fetched wish:", res.data);
//         return res.data;

//     } else {
//         const wishFromLocal = JSON.parse(localStorage.getItem("guestwish")) || [];
//         return wishFromLocal;
//     }
// });

// ✅ Add item to wish (for logged-in user only)
// ✅ Add item to wish (handles both logged-in and guest users)
export const addToWishlist = createAsyncThunk(
    "wish/adToWhislist",
    async (product, { getState }) => {
      const userId = getUserData()?.userId;
  
      const formattedProduct = {
        productId: product.id,
        title: product.name,
        images: getImageUrl(product.images),
        price: product.price,
      };

      
      if (userId) {
          // ✅ Logged-in user: send to backend
          await axiosInstance.post("/wish/add", {
          ...formattedProduct,
          userId,
        });
        
        return [...getState().wish.wish, { ...product, productId: product.id }];
    } else {
        // ✅ Guest user: use localStorage
        const guestWish = JSON.parse(localStorage.getItem("guestWish")) || [];
        
        console.log(formattedProduct)
        const existing = guestWish.find((item) => item.productId === product.id);
  
        let updatedGuestWish;
        if (existing) {
          updatedGuestWish = guestWish; // Don't add duplicate
        } else {
          updatedGuestWish = [...guestWish, formattedProduct];
        }
  
        localStorage.setItem("guestWish", JSON.stringify(updatedGuestWish));
  
        return updatedGuestWish;
      }
    }
  );
  

// ✅ Merge guest wish into server wish after login
export const mergeGuestWishWithServer = createAsyncThunk(
    "wish/mergeGuestWish",
    async () => {
        const guestWish = JSON.parse(localStorage.getItem("guestWish"));
        const userId = getUserData()?.userId;
        if (!guestWish || !userId) return;

        for (let item of guestWish) {
            const payload = {
                userId,
                productId: item.productId || item.id,
                title: item.name || item.productTitle,
                images: item.image,
                price: item.price,
            };
            try {
                await axiosInstance.post("/wish/add", payload);
            } catch (err) {
                console.error("❌ Failed to sync guest item:", payload, err);
            }
        }

        localStorage.removeItem("guestWish");
    }
);

// ✅ Remove item from wish
export const removeFromWishlist = createAsyncThunk(
    "wish/remove",
    async (productId, { getState }) => {
        const { wish } = getState().wish;
        const userId = getUserData()?.userId;

        if (isLoggedIn()) {
            try {
                await axiosInstance.post(`/wish/remove`, { userId, productId });
            } catch (err) {
                console.error("❌ Error removing from wish:", err);
            }
        }

        return wish.filter((item) => item.productId !== productId);
    }
);

