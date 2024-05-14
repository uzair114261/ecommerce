import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
  counter: 1,
  outOfStock: false,
  alert: false,
};

export const fetchProductInfo = createAsyncThunk(
  "productInfo/fetchProductInfo",
  async (slug) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}product/api/?slug=${slug}`
    );
    const data = await response.json();
    return data;
  }
);

export const ProductInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      if (state.product?.stock_quantity > state.counter) {
        state.counter += 1;
        state.alert = false;
        state.outOfStock = false;
      } else {
        state.alert = true;
        state.outOfStock = true;
      }
    },
    decrementCounter: (state) => {
      if (state.counter > 1) {
        state.counter -= 1;
      }
    },
    resetCounter: (state, action) => {
      state.counter = action.payload
    },
    setOutOfStock: (state, action) => {
      state.outOfStock = action.payload;
    },
    showAlert: (state) => {
      state.alert = true;
    },
    hideAlert: (state) => {
      state.alert = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductInfo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  incrementCounter,
  decrementCounter,
  resetCounter,
  setOutOfStock,
  showAlert,
  hideAlert,
} = ProductInfoSlice.actions;

export default ProductInfoSlice.reducer;
