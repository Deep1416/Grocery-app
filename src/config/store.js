import { configureStore } from "@reduxjs/toolkit";
import addCartSlice from "./addCartSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    cart: addCartSlice,
    User: userSlice,
  },
});
