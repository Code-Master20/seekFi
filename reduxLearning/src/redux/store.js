import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

/*
state shape becomes like this -->
{
  counter: {
    value: 0
  }
}
  */
