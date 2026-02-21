import api from "../../utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
//========================tracking if user is already logged in==========================
export const checkMe = createAsyncThunk("auth/isMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("/auth/me");
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
  "auth/sign-up-otp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/sign-up", clientCredentials);
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
  "auth/verify-sign-up-otp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await api.post(
        "/auth/sign-up/verify-otp",
        clientCredentials,
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

export const logInOtpReceived = createAsyncThunk(
  "auth/log-in-otp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await api.post("/auth/log-in", clientCredentials);
      return response.data;
    } catch (error) {
      let brokenResponse = {
        status: null,
        message: "",
        success: null,
      };

      const { message, success } = await error.response.data;
      const { status } = await error.response;

      brokenResponse.message = message;
      brokenResponse.success = success;
      brokenResponse.status = status;
      console.log(brokenResponse);

      return thunkAPI.rejectWithValue(brokenResponse);
    }
  },
);

export const otpVerifiedAndLoggedIn = createAsyncThunk(
  "auth/verify-log-in-otp",
  async (clientCredentials, thunkAPI) => {
    try {
      const response = await api.post(
        "/auth/log-in/verify-otp",
        clientCredentials,
      );

      return response.data;
    } catch (error) {
      const brokenResponse = {
        message: "",
        success: null,
        status: null,
      };

      const { message, success } = await error.response.data;
      const { status } = await error.response;
      brokenResponse.message = message;
      brokenResponse.success = success;
      brokenResponse.status = status;
      return thunkAPI.rejectWithValue(brokenResponse);
    }
  },
);
