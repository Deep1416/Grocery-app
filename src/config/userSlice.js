import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : ""
};

export const userSlice = createSlice({
  name: "ADD",
  initialState,
  reducers: {
    getUserInfo: (state , action) => {
        state.user = action.payload;
    },
  },
});

export const { getUserInfo} = userSlice.actions;
export default userSlice.reducer;
