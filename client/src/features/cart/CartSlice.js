import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  alert: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === product?.id
      );

      if (itemIndex !== -1) {
        const updatedCart = [...state.cartItems];
        const totalQuantity = updatedCart[itemIndex].quantity + quantity;
        if (totalQuantity <= product?.stock_quantity) {
          updatedCart[itemIndex].quantity = totalQuantity;
        } else {
          updatedCart[itemIndex].quantity = product?.stock_quantity;
          state.alert = true;
        }
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementItemQuantity: (state, action) => {
      const { itemId } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity + 1 > existingItem?.stock_quantity) {
          {
            state.alert = true;
          }
        } else {
          existingItem.quantity += 1;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action) => {
      const itemsToRemove = action.payload;
      const isItemInCart = state.cartItems.find(
        (item) => item.id === itemsToRemove.id
      );
      if (isItemInCart.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== itemsToRemove.id
        );
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.id === itemsToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    showAlert: (state) => {
      state.alert = true;
    },
    hideAlert: (state) => {
      state.alert = false;
    },
  },
});

export const selectedCartItems = (state) => state.cartItems;
export const getTotalPrice = (state) =>
  state.cart.cartItems?.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );

export default cartSlice.reducer;
export const {
  addToCart,
  incrementItemQuantity,
  removeFromCart,
  clearCart,
  showAlert,
  hideAlert,
} = cartSlice.actions;
