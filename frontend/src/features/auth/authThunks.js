import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkMe = createAsyncThunk("auth/checkMe", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4040/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Not authenticated");

    const data = await res.json();
    return data.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue("Not logged in");
  }
});
