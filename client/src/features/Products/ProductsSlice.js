import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    loading : false,
    error : null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async()=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}product/api`)
    const data = await response.json()
    return data;
})

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state)=> {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=> {
            state.error = action.error.message;
        });
    }
})

export default ProductSlice.reducer;