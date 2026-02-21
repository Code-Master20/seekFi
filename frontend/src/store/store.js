import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pageReducer from "../features/pageTracker/pageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pageTracker: pageReducer,
  },
});
