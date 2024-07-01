import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  openAlert: false,
};

const addCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddToCartBtn: (state, action) => {
      const product = action.payload;
      const isTargetedProductAlreadyExist = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (isTargetedProductAlreadyExist) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: ((item.quantity + 1) * item.price).toFixed(2),
              }
            : item
        );

        state.cartItems = updatedCartItems;
      } else {
        const newProduct = {
          ...product,
          quantity: 1,
          total: product.price.toFixed(2),
        };
        state.cartItems.push(newProduct);
      }

      state.openAlert = true;
    },
    closeAlert: (state) => {
      state.openAlert = false;
    },
    handleRemoveItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    handleClearItem: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const {
  handleAddToCartBtn,
  closeAlert,
  handleRemoveItem,
  handleClearItem,
} = addCartSlice.actions;
export default addCartSlice.reducer;
