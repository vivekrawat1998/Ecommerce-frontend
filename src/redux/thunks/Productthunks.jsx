import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9878/api/v1";

export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await axios.get(`${BASE_URL}/products/`);
    return response.data.products;
});

export const fetchSingleProducts = createAsyncThunk(
    "products/fetchSingleproduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/${id}`);
            return response.data.product;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data
});

export const fetchProductsBySearch = createAsyncThunk("products/fetchBySearch", async (search) => {
    const response = await axios.get(`${BASE_URL}/search?q=${search}`);
    return response.data;
});
export const fetchFeaturedProducts = createAsyncThunk("products/fetchfeaturedproducts", async (search) => {
    const response = await axios.get(`${BASE_URL}/products/featured`);
    return response.data.products;
});

export const fetchProductsByCategory = createAsyncThunk("products/fetchByCategory", async (slug) => {
    const response = await axios.get(`${BASE_URL}/category/slug/${slug}/products`);
    return response.data.products;
});

export const fetchProductsByPrice = createAsyncThunk(
    "products/fetchByPrice",
    async ({ min, max }) => {
        const response = await axios.get(`${BASE_URL}?limit=100`);
        return response.data.products.filter((p) => p.price >= min && p.price <= max);
    }
);
