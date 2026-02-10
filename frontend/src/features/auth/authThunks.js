import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkMe = createAsyncThunk("auth/checkMe", async (_, thunkAPI) => {
  try {
    const res = await fetch("https://seekfi.onrender.com/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Not authenticated");

    const data = await res.json();
    return data.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue("Not logged in");
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const res = await fetch("https://seekfi.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔴 VERY IMPORTANT
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const data = await res.json();
      return data.data.user; // backend user payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
