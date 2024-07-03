import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchProducts, fetchProductDetails, deleteProduct } from "../../apis/ProductApi"; // Import the API function to fetch product details

export interface Product {
  result: Product,
  id?: string;
  category_id: string;
  name: string;
  description: string;
  discount: number;
  images: string[];
  stock: number;
  price: number;
  created_at?: string;
  updated_at?: string;
  category_name : string;
 
}

interface ProductState {
  products: Product[];
  productDetails: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ProductState = {
  products: [],
  productDetails: null,
  status: "idle",
  error: null,
  currentPage: 1, 
  totalPages: 1, 
};

interface FetchProductsParams {
  page?: number;
  limit?: number;
}


export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 8 }: FetchProductsParams) => {
    const response = await fetchProducts({ page, limit });
    return response; 
  }
);


export const fetchProductDetailsAsync = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId: string) => {
    const response = await fetchProductDetails(productId);
    return response; 
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await deleteProduct(productId);
    return productId;
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
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch products";
      })
      .addCase(fetchProductDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetailsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload; 
      })
      .addCase(fetchProductDetailsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch product details";
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete product";
      });

  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductDetails = (state: RootState) =>
  state.products.productDetails?.result ?? null;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectTotalPages = (state: RootState) => state.products.totalPages;

export default productSlice.reducer;
