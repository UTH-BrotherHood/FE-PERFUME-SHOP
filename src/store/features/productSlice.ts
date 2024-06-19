import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../store";
import { fetchProducts } from "../../apis/ProductApi"; // Import the API function to fetch products
import { selectAccessToken } from "./authSlice";

interface Product {
 id?: string;
    category_id: string;
    name: string;
    description: string;
    discount: number;
    images: string[];
    stock: number;
    price: number;
    created_at?: Date;
    updated_at?: Date;
  // Add other properties of a product
}

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};


// Async thunk to fetch products
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async (accessToken: string | null) => {
    if (!accessToken) {
      throw new Error('Access token is null.');
    }
    const response = await fetchProducts(accessToken); 
    return response.data; 
  }
);


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products";
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;

export default productSlice.reducer;
