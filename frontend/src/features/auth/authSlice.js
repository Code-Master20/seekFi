import { createSlice } from "@reduxjs/toolkit";
import { checkMe } from "./authThunks";

const isLoggingTriggered = JSON.parse(
  localStorage.getItem("isLoggingTriggered"),
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isLoggingTriggered,
  },
  reducers: {
    isLoggingTask(state, action) {
      state.isLoggingTriggered = action.payload;
    },
  },
  //========================= hitting "xyz/api/auth/me" to see if user is already logged in =======================
  extraReducers: (builder) => {
    builder
      .addCase(checkMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = action.payload.success;
        state.error = null;
      })
      .addCase(checkMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = action.payload.success;
      });
  },
});

export const { isLoggingTask } = authSlice.actions;

export default authSlice.reducer;
