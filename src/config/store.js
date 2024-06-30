import { configureStore } from "@reduxjs/toolkit";
import addCartSlice from "./addCartSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    Cart: addCartSlice,
    User: userSlice,
  },
});
