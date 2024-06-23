import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productSlice from "./features/productSlice"; // Import the product slice
import authSlice from "./features/authSlice";
import categorySlice from './features/categoriesSlice'; // Import the auth slice

export const store = configureStore({
  reducer: {
    products: productSlice, // Include the product slice in the store
    auth: authSlice,
     categories: categorySlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
