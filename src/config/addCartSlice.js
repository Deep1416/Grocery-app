import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
  }

export const addCartSlice = createSlice({
    name : "ADD",
    initialState,
    reducers :{

        handleAddToCartBtn :(state)=>{

        }

    }
})

export const { handleAddToCartBtn } = addCartSlice.actions
export default addCartSlice.reducer