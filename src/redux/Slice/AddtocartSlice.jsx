import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../thunks/AddtocartThunk";

const initialState = {
    cart: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            })

            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            })

            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
            })

            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
