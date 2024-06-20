import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
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
  currentPage: number;
  totalPages: number;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
  currentPage: 1, // Initial current page
  totalPages: 1, // Initial total pages
};

interface FetchProductsParams {

  page?: number;
  limit?: number;
}

// Async thunk to fetch products
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async ({  page = 1, limit = 8 }: FetchProductsParams) => {
   
    const response = await fetchProducts({page, limit });
    return response; // Return the whole response object including total pages
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
        state.products = action.payload.products;
        state.totalPages = action.payload.total_pages; // Update total pages from the response
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
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectTotalPages = (state: RootState) => state.products.totalPages;

export default productSlice.reducer;
