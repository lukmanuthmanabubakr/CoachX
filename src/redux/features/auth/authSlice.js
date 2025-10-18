import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isVerified: user?.is_verified || false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      const response = await authService.verifyEmail(token);

      // ✅ get local user & mark verified manually
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...storedUser,
        is_verified: true,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { message: response.message, user: updatedUser };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Email verification failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user (fetch latest data)
export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localUser?.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    const user = await authService.getMe(token);
    return user;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to fetch user data";
    return thunkAPI.rejectWithValue(message);
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, thunkAPI) => {
    try {
      return await authService.forgotPassword(emailData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Forgot password failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, passwordData }, thunkAPI) => {
    try {
      return await authService.resetPassword({ token, passwordData });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Password reset failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user details
export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (userData, thunkAPI) => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      const token = localUser?.token;

      if (!token) return thunkAPI.rejectWithValue("No token found");

      const updatedUser = await authService.updateMe(userData, token);
      return updatedUser;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Update failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isVerified = false; // 👈 reset verification state
      toast.success("You have logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isVerified = action.payload?.is_verified || false; // 👈 sync verification status

        toast.success("Registered Successfully!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isVerified = false;

        toast.error(action.payload || "Signup failed. Try again.");
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload || "Login failed");
      })

      //Verify EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isVerified = true;
        state.user = action.payload.user; // ✅ now always defined
        toast.success("Email verified successfully");
      })

      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload || "Email verification failed ❌");
      })
      // Get user
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isVerified = action.payload?.is_verified || false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        toast.success(action.payload.message || "Password reset link sent");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload || "Failed to send reset link");
      })
      // Reset Password in extraReducers
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = state.user
          ? { ...state.user, token: action.payload.token }
          : null;
        toast.success(
          action.payload.message || "Password reset successfully"
        );
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload || "Password reset failed ❌");
      })
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Profile updated successfully");
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload || "Failed to update profile ❌");
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
