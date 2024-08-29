import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../services/adminService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const getDeliverySlots = createAsyncThunk('admin/getDeliverySlots', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(adminService.getDeliverySlots, reqObj, thunkAPI);
});

export const getZones = createAsyncThunk('admin/getZones', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(adminService.getZones, reqObj, thunkAPI);
});


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    deliverySlots: [],
    zones: [],
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliverySlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeliverySlots.fulfilled, (state, action) => {
        console.log(action.payload)
        if(action.payload.success) {
            state.deliverySlots = action.payload.data.items
        } else {
          state.error = action.payload.message
          state.deliverySlots = []
        }
        state.loading = false;
      })
      .addCase(getDeliverySlots.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getZones.pending, (state) => {
        state.loading = true;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        console.log(action.payload)
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

export const { } = adminSlice.actions;

export default adminSlice.reducer;
