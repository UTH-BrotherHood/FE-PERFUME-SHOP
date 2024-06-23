import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as UserApi from "../../apis/UserApi";
import { RootState } from "../store";

// Define User interface
interface User {
  id: string;
  username: string;
  email: string;
  token: string | null;
  cart: any[]; // Define your actual structure for cart items
  wishlist: any[]; // Define your actual structure for wishlist items
}

// Define AuthState interface
interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Retrieve token from localStorage if available
const initialAccessToken = localStorage.getItem("accessToken");

// Retrieve user from localStorage if available
const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState: AuthState = {
  user: initialUser,
  accessToken: initialAccessToken,
  status: "idle",
  error: null,
};

// Async Thunks for userLogin, userLogout, userRegister
export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (credentials: { email: string; password: string }) => {
    const response = await UserApi.LoginUser(credentials);
    if (response.status === "200") {
      const { data, access_token } = response;
      const user: User = {
        id: data._id,
        username: data.username,
        email: data.email,
        token: access_token,
        cart: [], // Initialize empty cart array
        wishlist: [], // Initialize empty wishlist array
      };
      return user;
    } else {
      throw new Error(response.message || "Login failed");
    }
  }
);

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  await UserApi.LogOutUser();
  return null;
});

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (credentials: {
    email: string;
    name: string;
    password: string;
    date_of_birth: string;
    confirm_password: string;
  }) => {
    const response = await UserApi.RegisterUser(credentials);
    if (response.status === "OK") {
      const { data, access_token } = response;
      const user: User = {
        id: data._id,
        username: data.username,
        email: data.email,
        token: access_token,
        cart: [], // Initialize empty cart array
        wishlist: [], // Initialize empty wishlist array
      };
      return user;
    }
    return null;
  }
);

// Create authSlice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to set user data
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.accessToken = action.payload.token;
      // Update localStorage with user and token
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("accessToken", action.payload.token as string);
    },
    // Reducer to clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending, fulfilled, and rejected actions for userLogin
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.accessToken = action.payload.token;
        state.error = null;
        // Update localStorage with user and token
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("accessToken", action.payload.token as string);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Login failed";
      })
      // Handle pending, fulfilled, and rejected actions for userLogout
      .addCase(userLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.accessToken = null;
        // Clear localStorage for user and token
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Logout failed";
      })
      // Handle pending, fulfilled, and rejected actions for userRegister
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Registration failed";
      });
  },
});

// Export actions and reducer from authSlice
export const { setUser, clearError } = authSlice.actions;

// Selectors to access parts of the AuthState
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

// Selector to retrieve user directly from localStorage
export const selectUserFromLocalStorage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  return storedUser;
};

// Export default reducer from authSlice
export default authSlice.reducer;
