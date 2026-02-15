import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// http://localhost:5173
// https://seekfi.onrender.com
//========================tracking if user is already logged in==========================
export const checkMe = createAsyncThunk("auth/isMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://seekfi.onrender.com/api/auth/me",
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    let brokenResponse = {
      status: null,
      message: "",
      success: null,
    };
    if (error.response.status === 401) {
      const backendBrokenResponse = await error.response.data;
      const status = await error.response.status;
      const { message, success } = backendBrokenResponse;
      brokenResponse.status = status;
      brokenResponse.message = message;
      brokenResponse.success = success;
    }
    if (error.response.status === 500) {
      const backendBrokenResponse = await error.response.data;
      const status = await error.response.status;
      const { message, success } = backendBrokenResponse;
      brokenResponse.status = status;
      brokenResponse.message = message;
      brokenResponse.success = success;
    }

    return thunkAPI.rejectWithValue(brokenResponse);
  }
});

//==========================sending otp before sign-up verification=======================
export const signUpOtpReceived = createAsyncThunk(
  "auth/signUpOtp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://seekfi.onrender.com/api/auth/sign-up",
        clientCredentials,
        // { withCredentials: true },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {}
  },
);

//========================otp verify for successfull sign-up==============================
export const otpVerifiedAndSignedUp = createAsyncThunk(
  "auth/verifiedOtp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await fetch(
        `https://seekfi.onrender.com/api/auth/sign-up/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientCredentials),
          credentials: "include",
        },
      );

      const dataFromBackend = await response.json();

      if (!response.ok) {
        const brokenResponse = { ...dataFromBackend };
        return thunkAPI.rejectWithValue(brokenResponse);
      }
      return thunkAPI.fulfillWithValue(dataFromBackend);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
