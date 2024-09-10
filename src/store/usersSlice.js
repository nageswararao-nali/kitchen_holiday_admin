import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersService from '../services/usersService';
import { handleAuthApiCall } from '../utils/apiUtils';

export const getTotalUsers = createAsyncThunk('users/getTotalUsers', async (thunkAPI) => {
  return handleAuthApiCall(usersService.getTotalUsers, {}, thunkAPI);
});

export const getTotalCustomers = createAsyncThunk('users/getTotalCustomers', async (thunkAPI) => {
    return handleAuthApiCall(usersService.getTotalUsers, {searchQuery: {user_type: 'customer'}}, thunkAPI);
  });

export const getTotalDrivers = createAsyncThunk('users/getTotalDrivers', async (thunkAPI) => {
    return handleAuthApiCall(usersService.getTotalUsers, {searchQuery: {user_type: 'driver'}}, thunkAPI);
});

export const addUser = createAsyncThunk('users/addUser', async (user, thunkAPI) => {
    return handleAuthApiCall(usersService.addUser, user, thunkAPI);
});

export const updateUser = createAsyncThunk('users/updateUser', async (user, thunkAPI) => {
  return handleAuthApiCall(usersService.updateUser, user, thunkAPI);
});

export const getUsers = createAsyncThunk('users/getUsers', async (searchQuery, thunkAPI) => {
    return handleAuthApiCall(usersService.getUsers, {searchQuery}, thunkAPI);
});

export const getUser = createAsyncThunk('users/getUser', async (searchQuery, thunkAPI) => {
  return handleAuthApiCall(usersService.getUser, searchQuery, thunkAPI);
});

export const getUsersSearch = createAsyncThunk('users/getUsersSearch', async (searchQuery, thunkAPI) => {
  return handleAuthApiCall(usersService.getUsersSearch, searchQuery, thunkAPI);
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (user, thunkAPI) => {
  return handleAuthApiCall(usersService.deleteUser, user, thunkAPI);
});

export const getUserAddresses = createAsyncThunk('users/getUserAddresses', async (reaObj, thunkAPI) => {
  return handleAuthApiCall(usersService.getUserAddresses, reaObj, thunkAPI);
});

export const getUsersSubscriptions = createAsyncThunk('users/getUsersSubscriptions', async (reaObj, thunkAPI) => {
  return handleAuthApiCall(usersService.getUsersSubscriptions, reaObj, thunkAPI);
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    totalUsers: 0,
    totalCustomers: 0,
    totalDrivers: 0,
    userAddresses: [],
    users: [],
    usersSubscriptions: [],
    error: null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalUsers.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.totalUsers = action.payload.data.count
        }
        state.loading = false;
      })
      .addCase(getTotalUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getTotalCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalCustomers.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.totalCustomers = action.payload.data.count
        }
        state.loading = false;
      })
      .addCase(getTotalCustomers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getTotalDrivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalDrivers.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.totalDrivers = action.payload.data.count
        }
        state.loading = false;
      })
      .addCase(getTotalDrivers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if(!action.payload.success) {
            state.error = action.payload.message
        }
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.users = action.payload.data.users
        }
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(getUsersSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersSearch.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.users = action.payload.data.users
        }
        state.loading = false;
      })
      .addCase(getUsersSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if(action.payload.success) {
            // state.users = action.payload.data.users
        }
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(getUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        if(action.payload.success) {
            state.userAddresses = action.payload.data.users
        }
        state.loading = false;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      
  },
});

export const {  } = usersSlice.actions;

export default usersSlice.reducer;
