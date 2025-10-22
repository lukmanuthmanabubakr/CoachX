import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import creatorReducer from "./features/creators/creatorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    creators: creatorReducer,
  },
});
