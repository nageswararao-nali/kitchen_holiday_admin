import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { handleAuthApiCall } from '../utils/apiUtils';

const user = JSON.parse(localStorage.getItem('user'));
const userToken = localStorage.getItem('userToken');
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  return handleAuthApiCall(authService.register, user, thunkAPI);
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  return handleAuthApiCall(authService.login, user, thunkAPI);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? user : null,
    isAuthenticated: !!user,
    loading: false,
    error: null,
    username: user ? user.username : null,
    userToken: userToken ? userToken : null,
    isShowSidebar: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userToken = null;
      state.username = null;
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
    },
    loginD: (state) => {
        console.log("login action called .....!")
        let userPayload = {username: 'nag', mobile: '9030935373'}
        state.user = userPayload;
        localStorage.setItem('user', JSON.stringify(userPayload))
        state.isAuthenticated = true;
    },
    showSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        if(action.payload.success) {
          state.loading = false
          state.userToken = action.payload.data.access_token
          state.user = action.payload.data.user
          state.isAuthenticated = true;
          localStorage.setItem('userToken', action.payload.data.access_token)
          localStorage.setItem('user', JSON.stringify(action.payload.data.user))
        } else {
          state.loading = false
          state.error = action.payload.message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export const { logout, loginD, showSidebar } = authSlice.actions;

export default authSlice.reducer;
