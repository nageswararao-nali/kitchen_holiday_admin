import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subscriptionService from '../services/subscriptionService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const addSubscription = createAsyncThunk('subscriptions/addSubscription', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.addSubscription, reqObj, thunkAPI);
});

export const getSubscriptions = createAsyncThunk('subscriptions/getSubscriptions', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.getSubscriptions, reqObj, thunkAPI);
});

export const getSubscription = createAsyncThunk('subscriptions/getSubscription', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.getSubscription, reqObj, thunkAPI);
});

export const addZone = createAsyncThunk('subscriptions/addZone', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.addZone, reqObj, thunkAPI);
  });
  
  export const getZones = createAsyncThunk('subscriptions/getZones', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.getZones, reqObj, thunkAPI);
  });
  export const addZoneMapping = createAsyncThunk('subscriptions/addZoneMapping', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.addZoneMapping, reqObj, thunkAPI);
  });
  export const zoneMappingsData = createAsyncThunk('subscriptions/zoneMappingsData', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.zoneMappingsData, reqObj, thunkAPI);
  });
  export const getOrderDates = createAsyncThunk('subscriptions/getOrderDates', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.getOrderDates, reqObj, thunkAPI);
  }); 

  export const deleteSubscription = createAsyncThunk('subscriptions/deleteSubscription', async (reqObj, thunkAPI) => {
    return handleAuthApiCall(subscriptionService.deleteSubscription, reqObj, thunkAPI);
  }); 
  
export const userSubscriptions = createAsyncThunk('subscriptions/getMySubscriptions', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.userSubscriptions, reqObj, thunkAPI);
}); 
export const updateMySubscription = createAsyncThunk('subscriptions/updateMySubscription', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.updateMySubscription, reqObj, thunkAPI);
});

export const deleteMySubscription = createAsyncThunk('subscriptions/deleteMySubscription', async (reqObj, thunkAPI) => {
  return handleAuthApiCall(subscriptionService.deleteMySubscription, reqObj, thunkAPI);
});

const subscriptionSlice = createSlice({
  name: 'items',
  initialState: {
    loading: false,
    subscriptions: [],
    zones: [],
    lastSubDate: null,
    mappings: [],
    usersSubscriptions: [],
    subscription: {},
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
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscription.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.subscription = action.payload.data
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(getSubscription.rejected, (state, action) => {
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
      .addCase(addZoneMapping.pending, (state) => {
        state.loading = true;
      })
      .addCase(addZoneMapping.fulfilled, (state, action) => {
        if(!action.payload.success) {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addZoneMapping.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(zoneMappingsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(zoneMappingsData.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.mappings = action.payload.data.items
        } else {
          state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(zoneMappingsData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getOrderDates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDates.fulfilled, (state, action) => {
        if(action.payload.success) {
          let orderDates = action.payload.data
            state.lastSubDate = orderDates[orderDates.length -1]
        } else {
          state.error = action.payload.message
          // state.mySubscriptions = []
        }
        state.loading = false;
      })
      .addCase(getOrderDates.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(userSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSubscriptions.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.usersSubscriptions = action.payload.data.items
        } else {
          state.error = action.payload.message
          state.usersSubscriptions = []
        }
        state.loading = false;
      })
      .addCase(userSubscriptions.rejected, (state, action) => {
        state.loading = false;
      })
      
  },
});

export const {  } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
