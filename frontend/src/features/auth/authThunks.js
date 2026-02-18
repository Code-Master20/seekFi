import api from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
//========================tracking if user is already logged in==========================
export const checkMe = createAsyncThunk("auth/isMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("/api/auth/me", {
      withCredentials: true,
    });
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
      const response = await api.post("/api/auth/sign-up", clientCredentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      let brokenResponse = {
        status: null,
        message: "",
        success: null,
      };
      const backendBrokenResponse = await error.response?.data;
      const status = await error.response.status;

      const { message, success } = backendBrokenResponse;
      brokenResponse.message = message;
      brokenResponse.status = status;
      brokenResponse.success = success;
      return thunkAPI.rejectWithValue(brokenResponse);
    }
  },
);

//========================otp verify for successfull sign-up==============================
export const otpVerifiedAndSignedUp = createAsyncThunk(
  "auth/verifiedOtp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await api.post(
        "/api/auth/sign-up/verify-otp",
        clientCredentials,
        {
          withCredentials: true,
        },
      );

      const dataFromBackend = response.data;
      return dataFromBackend;
    } catch (error) {
      let brokenResponse = {
        status: null,
        message: "",
        success: null,
      };
      const backendBrokenResponse = await error.response?.data;
      const status = await error.response.status;
      const { message, success } = backendBrokenResponse;
      brokenResponse.status = status;
      brokenResponse.success = success;
      brokenResponse.message = message;

      return thunkAPI.rejectWithValue(brokenResponse);
    }
  },
);
