// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { GetAllProducts, GetProductById } from "../../apis/ProductApi";
// import { IProductData } from "../../types/product.type";
// import { RootState } from "../store";

// interface FilterCriteria {
//   page?: number;
//   limit?: number;
//   category?: string;
//   categoryNames?: string;
//   minPrice?: number | null;
//   maxPrice?: number | null;
//   brand?: string;
//   brandName?: string;
//   search?: string;
//   sort?: string;
// }

// export const fetchFilteredProducts = createAsyncThunk(
//   "products/fetchFilteredProducts",
//   async (filterCriteria: FilterCriteria) => {
//     const response = await GetAllProducts({
//       page: filterCriteria.page ?? 1,
//       limit: filterCriteria.limit ?? 8,
//       category: filterCriteria.category ?? "",
//       minPrice: filterCriteria.minPrice ?? undefined,
//       maxPrice: filterCriteria.maxPrice ?? undefined,
//       brand: filterCriteria.brand ?? "",
//       search: filterCriteria.search ?? "",
//       sort: filterCriteria.sort ?? "",
//     });
//     return response;
//   }
// );

// export const fetchProductDetails = createAsyncThunk(
//   "products/fetchProductDetails",
//   async (productId: string) => {
//     const response = await GetProductById(productId);
//     return response;
//   }
// );

// interface ProductState {
//   products: IProductData[];
//   productDetails: IProductData | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   page: number;
//   limit: number;
//   total: number;
//   filterCriteria: FilterCriteria;
// }

// const initialState: ProductState = {
//   products: [],
//   productDetails: null,
//   status: "idle",
//   error: null,
//   page: 1,
//   limit: 8,
//   total: 0,
//   filterCriteria: {
//     minPrice: null,
//     maxPrice: null,
//     search: "",
//     sort: "",
//     brand: "",
//   },
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<IProductData>) => {
//       state.products.push(action.payload);
//     },
//     updateFilterCriteria: (
//       state,
//       action: PayloadAction<Partial<FilterCriteria>>
//     ) => {
//       state.filterCriteria = { ...state.filterCriteria, ...action.payload };
//     },
//     resetPriceFilter: (state) => {
//       state.filterCriteria.minPrice = null;
//       state.filterCriteria.maxPrice = null;
//     },
//     setSearchKeyword: (state, action: PayloadAction<string>) => {
//       state.filterCriteria.search = action.payload;
//     },
//     setSortOption: (state, action: PayloadAction<string>) => {
//       state.filterCriteria.sort = action.payload;
//     },
//     setBrandFilter: (state) => {
//       state.filterCriteria.brand = "";
//       state.filterCriteria.brandName = "";
//     },
//     setBrandName: (state, action: PayloadAction<string>) => {
//       state.filterCriteria.brandName = action.payload;
//     },
//     setCategoryNames: (state, action: PayloadAction<string>) => {
//       state.filterCriteria.categoryNames = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFilteredProducts.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.products = action.payload.products ?? [];
//         state.page = action.payload.page ?? state.page;
//         state.limit = action.payload.limit ?? state.limit;
//         state.total = action.payload.total ?? state.total;
//         state.error = null;
//       })
//       .addCase(fetchFilteredProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message ?? "Something went wrong";
//       })
//       .addCase(fetchProductDetails.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchProductDetails.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.productDetails = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchProductDetails.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message ?? "Something went wrong";
//       });
//   },
// });

// export const selectFilterCriteria = (state: RootState) =>
//   state.products.filterCriteria;

// export const selectProductDetails = (state: RootState) =>
//   state.products.productDetails;

// export const selectProductStatus = (state: RootState) => state.products.status;

// export const selectProductError = (state: RootState) => state.products.error;

// export const {
//   addProduct,
//   updateFilterCriteria,
//   resetPriceFilter,
//   setSearchKeyword,
//   setSortOption,
//   setBrandFilter,
//   setBrandName,
//   setCategoryNames,
// } = productSlice.actions;

// export default productSlice.reducer;
