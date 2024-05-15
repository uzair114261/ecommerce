import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../features/Products/ProductsSlice';
import productInfoReducer from '../features/ProductsInfo/ProductInfoSlice';
import CartReducer from '../features/cart/CartSlice';
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice'
import multiStepReducer from '../features/multistep/multistepSlice'

export const store = configureStore({
    reducer:{
        products: productsReducer,
        productInfo: productInfoReducer,
        cart: CartReducer,
        register: registerReducer,
        login: loginReducer,
        multistep: multiStepReducer
    }
})