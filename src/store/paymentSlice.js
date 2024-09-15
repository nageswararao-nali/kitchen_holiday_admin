import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentsService from '../services/paymentsService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const getPayments = createAsyncThunk('payments/getPayments', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(paymentsService.getPayments, reqObj, thunkAPI);
});

export const getRefunds = createAsyncThunk('payments/getRefunds', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(paymentsService.getRefunds, reqObj, thunkAPI);
  });

export const updateRefund = createAsyncThunk('payments/updateRefund', async (user, thunkAPI) => {
  return handleAuthApiCall(paymentsService.updateRefund, user, thunkAPI);
});

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    loading: false,
    payments: [],
    refunds: [],
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.payments = action.payload.data.items
        }
        state.loading = false;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getRefunds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRefunds.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.refunds = action.payload.data.items
        }
        state.loading = false;
      })
      .addCase(getRefunds.rejected, (state, action) => {
        state.loading = false;
      })
      
      
  },
});

export const {  } = paymentsSlice.actions;

export default paymentsSlice.reducer;
