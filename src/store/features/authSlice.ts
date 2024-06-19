import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as UserApi from "../../apis/UserApi";
import { RootState } from "../store";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (credentials: { email: string; password: string }) => {
    const response = await UserApi.LoginUser(credentials);
    if (response.status === "OK") {
      const { data, access_token } = response;
      const user = {
        id: data._id,
        name: data.name,
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
      const user = {
        id: data._id,
        name: data.name,
        email: data.email,
        token: access_token,
      };
      return user;
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
        state.error = null;
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
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Logout failed";
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // .addCase(userRegister.fulfilled, (state, action: PayloadAction<User>) => {
      //   state.status = "succeeded";
      //   state.user = action.payload;
      //   state.error = null;
      // })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        const errorMessage = action.error.message ?? "Registration failed";
      
        // Handle specific error messages
        if (action.error.message && action.error.message.includes("Email already exists")) {
          state.error = "This email is already registered.";
        } else if (action.error.message && action.error.message.includes("Invalid value")) {
          state.error = "Invalid value provided.";
        } else {
          state.error = errorMessage;
        }
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { setUser, clearError } = authSlice.actions;

export default authSlice.reducer;
