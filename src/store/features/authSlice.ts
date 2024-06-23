// authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as UserApi from "../../apis/UserApi";
import { RootState } from "../store";

interface User {
  id: string;
  username: string;
  email: string;
  token: string | null;
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
      };
      return user;
    } else {
      throw new Error(response.message || "Login failed");
    }
  },
);

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  await UserApi.LogOutUser();
  return null;
});

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (credentials: { email: string; name: string; password: string, date_of_birth: string, confirm_password: string }) => {
    const response = await UserApi.RegisterUser(credentials);
    if (response.status === "OK") {
      const { data, access_token } = response;
      const user: User = {
        id: data._id,
        username: data.username,
        email: data.email,
        token: access_token,
      };
      return user;
    }
    return null;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
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
        state.error = action.error.message ?? "Login failed";
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
        state.error = action.error.message ?? "Logout failed";
      })
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

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const { setUser, setAccessToken, clearError } = authSlice.actions;

export default authSlice.reducer;
