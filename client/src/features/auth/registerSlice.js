import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  response: {}
};

export const createUser = createAsyncThunk(
  "register/createUser",
  async (userData, thunk) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}account/users/api/create-customer/`,{
            method: 'POST',
            body: userData
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
    }catch(error){
        console.log('error is', thunk.rejectWithValue(error))
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.response = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : 'Failed to create user';
      })
      
      
  }
});

export default registerSlice.reducer;
