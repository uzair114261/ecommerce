import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
  success: true,
  loading: false,
  response: {}
};

export const submitCODPayment = createAsyncThunk(
  "multiStep/SubmitCODPatment",
  async (paymentData, thunk) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}payments/cod-payment`,
        {
          method: "POST",
          body: paymentData,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return thunk.rejectWithValue(errorData);
      }
      if (response.ok) {
        return response;
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("error is: ", thunk.rejectWithValue(error));
    }
  }
);

export const CredictCardTransaction = createAsyncThunk(
  'multiStep/CredictCardTransaction',
  async(data, thunk) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}payments/card-transaction`, {
      method: 'POST',
      body: data
    })
    if(!response.ok){
      const errorData = await response.json()
      return thunk.rejectWithValue(errorData)
    }
    if(response.ok){
      return response
    }
    const responseData = await response.json()
    return responseData
  }
)

export const multiStepSlice = createSlice({
  name: "multiStep",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPaymentData: (state, action) => {
      state.paymentData = { ...state.paymentData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(submitCODPayment.pending, (state, action)=>{
      state.loading = true;
    })
    .addCase(submitCODPayment.fulfilled, (state, action) => {
      state.loading = false
      state.response = action.payload
    })
    .addCase(submitCODPayment.rejected, (state, action)=> {
      state.loading = false;
    })
    .addCase(CredictCardTransaction.pending, (state) => {
      state.loading = true;
    })
    .addCase(CredictCardTransaction.fulfilled, (state, action) =>{
      state.loading = false;
      state.response = action.payload
    })
    .addCase(CredictCardTransaction.rejected, (state, action) => {
      state.loading = false;
    })
  }
});

export const { setStep, setPaymentData, setErrors, setSuccess } =
  multiStepSlice.actions;
export default multiStepSlice.reducer;
