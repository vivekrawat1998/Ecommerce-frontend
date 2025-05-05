import { createSlice } from "@reduxjs/toolkit";

const addtowishslice = createSlice({
  name: "wish",
  initialState: {
    wish: [],
    loading: false,
    error: null,
  },
  reducers: {
    addtoWish: (state, action) => {
      const product = action.payload;
      const exists = state.wish.find((item) => item.id === product.id);
      if (!exists) {
        state.wish.push({ ...product });
      }
    },
    removeWish: (state, action) => {
      const id = action.payload;
      state.wish = state.wish.filter((item) => item.id !== id);
    },
  },
});

export const { addtoWish, removeWish } = addtowishslice.actions;

export default addtowishslice.reducer;
