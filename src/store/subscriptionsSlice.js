import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subscriptionService from '../services/subscriptionService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const addSubscription = createAsyncThunk('subscriptions/addSubscription', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.addSubscription, reqObj, thunkAPI);
});

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.getSubscriptions, reqObj, thunkAPI);
});

export const addZone = createAsyncThunk('subscriptions/addZone', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.addZone, reqObj, thunkAPI);
  });
  
  export const getZones = createAsyncThunk('subscriptions/getZones', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.getZones, reqObj, thunkAPI);
  });


const subscriptionSlice = createSlice({
  name: 'items',
  initialState: {
    loading: false,
    subscriptions: [],
    zones: [],
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.subscriptions = action.payload.data.items
        } else {
          state.error = action.payload.message
          state.subscriptions = []
        }
        state.loading = false;
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(addZone.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addZone.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getZones.pending, (state) => {
        state.loading = true;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.zones = action.payload.data.items
        } else {
          state.error = action.payload.message
          state.zones = []
        }
        state.loading = false;
      })
      .addCase(getZones.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const {  } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
