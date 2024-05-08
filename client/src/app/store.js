import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/Products/ProductsSlice';

export const store = configureStore({
    reducer:{
        products: productsReducer,
    }
})