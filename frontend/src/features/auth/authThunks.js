import { createAsyncThunk } from "@reduxjs/toolkit";

//========================tracking if user is already logged in==========================
export const checkMe = createAsyncThunk("auth/isMe", async (_, thunkAPI) => {
  try {
    const response = await fetch("https://seekfi.onrender.com/api/auth/me", {
      credentials: "include", // ensures cookies are sent
    });

    const decodedResponse = await response.json();
    if (!response.ok) {
      const brokenResponse = { ...decodedResponse };
      return thunkAPI.rejectWithValue(brokenResponse);
    }
    return decodedResponse;
    /*
     =========== From backend ===========:- 
      ErrorHandler structure --->{
      success:false,
      message:"xyz string"
      }
      const { message, success } = brokenResponse;
      message:"Not Authenticated";
      success:false;
      status:401;

    }

    ============ From backend =============:-
    successHandler structure --->{
    success:true, 
    data : {keys:values}, 
    successMessage:"xyz string"
    }
     status: 200
     success :true, 
     data: {
            email, 
            userId
      } since in user.model.js in backend I used  "id and email" as payloads during generateLoggedTrackTkn

      successMesage = "Successfully Authenticated"
    */
    // const { success, data, successMessage } = decodedResponse;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
