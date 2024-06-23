// authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as UserApi from "../../apis/UserApi";
import { RootState } from "../store";

interface User {
  id: string;
  username: string;
  email: string;
  token: string | null;
  cart: any[]; // Define your actual structure for cart items
  wishlist: any[]; 
  total_cart_quantity: number;
  total_wishlist_quantity: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Retrieve token from localStorage if available
const initialAccessToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
  user: null,
  accessToken: initialAccessToken,
  status: "idle",
  error: null,
};

// Async thunk to login user
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response: { status: string, message?: string, data: any, access_token: string } = await UserApi.LoginUser(credentials);
      if (response.status === "200") {
        const { data, access_token } = response;
        const user: User = {
          id: data._id,
          username: data.username,
          email: data.email,
          token: access_token,
          cart: data.cart,
          wishlist: data.wishlist,
          total_wishlist_quantity: data.wishlist.length,
          total_cart_quantity: data.cart.length,
        };
        return user;
      } else {
        return rejectWithValue(response.message || "Login failed");
      }
    } catch (error) {
      return rejectWithValue(error?.message ?? "Login failed");
    }
  }
);

// Async thunk to logout user
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      await UserApi.LogOutUser();
      return null;
    } catch (error) {
      return rejectWithValue(error.message ?? "Logout failed");
    }
  }
);

// Async thunk to register user
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (
    credentials: {
      email: string;
      name: string;
      password: string;
      date_of_birth: string;
      confirm_password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await UserApi.RegisterUser(credentials);
      if (response.status === "OK") {
        const { data, access_token } = response;
        const user: User = {
          id: data._id,
          username: data.username,
          email: data.email,
          token: access_token,
          cart: data.cart,
          wishlist: data.wishlist,
          total_wishlist_quantity: data.wishlist.length,
          total_cart_quantity: data.cart.length,
        };
        return user;
      } else {
        return rejectWithValue(response.message || "Registration failed");
      }
    } catch (error) {
      return rejectWithValue(error?.message ?? "Registration failed");
    }
  }
);

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserApi.getUserDetails(); // Define your getUserDetails function in UserApi
      if (response.status === "OK") {
        const { data } = response;
        const user: User = {
          id: data._id,
          username: data.username,
          email: data.email,
          token: data.access_token, // Ensure this matches your API response structure
          cart: data.cart,
          wishlist: data.wishlist,
          total_wishlist_quantity: data.wishlist.length,
          total_cart_quantity: data.cart.length,
        };
        return user;
      } else {
        return rejectWithValue(response.message || "Failed to fetch user details");
      }
    } catch (error) {
      return rejectWithValue(error.message ?? "Failed to fetch user details");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      // Update localStorage
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload);
      } else {
        localStorage.removeItem("accessToken");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.accessToken = action.payload.token;
        state.error = null;
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("accessToken", action.payload.token as string);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.toString() : "Login failed";
      })
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.accessToken = null;
        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.toString() : "Logout failed";
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.accessToken = action.payload?.token ?? null;
        state.error = null;
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          localStorage.setItem("accessToken", action.payload.token as string);
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.toString() : "Registration failed";
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.accessToken = action.payload.token;
        state.error = null;
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.toString() : "Failed to fetch user details";
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const { setUser, setAccessToken, clearError } = authSlice.actions;

export default authSlice.reducer;
