import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pageReducer from "../features/navigation/pageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pageTracker: pageReducer,
  },
});
