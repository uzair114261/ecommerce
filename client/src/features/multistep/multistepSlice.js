import { createSlice } from "@reduxjs/toolkit";
import { getTotalPrice } from "../cart/CartSlice";

const initialState = {
  step: 1,
  paymentData: {
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    cardHolderName: "",
    cvv: "",
    expDate: "",
    cardNumber: "",
  },
  errors: {
    email: "",
    cardHolderName: "",
    cvv: "",
    expDate: "",
    cardNumber: "",
  }
};

export const multiStepSlice = createSlice({
    name: 'multiStep',
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setPaymentData: (state, action) => {
            state.paymentData = {...state.paymentData, ...action.payload}
        },
        setErrors: (state, action) => {
            state.errors = {...state.errors, ...action.payload}
        }
    }
})

export const {setStep, setPaymentData, setErrors} = multiStepSlice.actions;
export default multiStepSlice.reducer