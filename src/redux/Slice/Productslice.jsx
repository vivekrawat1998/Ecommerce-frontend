import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsBySearch,
  fetchProductsByCategory,
  fetchProductsByPrice,
  fetchSingleProducts,
  fetchFeaturedProducts
} from "../thunks/Productthunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    featuredproducts: null,
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredproducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByPrice.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });

    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
