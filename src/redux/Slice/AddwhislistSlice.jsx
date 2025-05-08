import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  removeFromWishlist,
  mergeGuestWishWithServer,
} from "../thunks/AddwhishlistThunk";

const initialState = {
  wish: [],
  loading: false,
  error: null,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    clearwish: (state) => {
      state.wish = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchwish.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchwish.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.wish = action.payload;
      //   state.error = null;
      // })
      // .addCase(fetchwish.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wish = action.payload;
      })
      .addCase(mergeGuestWishWithServer.fulfilled, (state, action) => {
        state.wish = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wish = action.payload;
      })
  },
});

export const { clearWish } = wishSlice.actions;
export default wishSlice.reducer;
