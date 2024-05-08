import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/Products/ProductsSlice';
import productInfoReducer from '../features/ProductsInfo/ProductInfoSlice';

export const store = configureStore({
    reducer:{
        products: productsReducer,
        productInfo: productInfoReducer
    }
})