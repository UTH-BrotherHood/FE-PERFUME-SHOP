import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productSlice from "./features/productSlice"; 
import categorySlice from './features/categoriesSlice'; 
import authSlice  from "./features/authSlice";
export const store = configureStore({
  reducer: {
    products: productSlice, 
    auth: authSlice,
     categories: categorySlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
