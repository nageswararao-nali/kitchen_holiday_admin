import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
import itemsReducer from './itemsSlice';
import ordersReducer from './orderSlice';
import subscriptionsReducer from './subscriptionsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    items: itemsReducer,
    orders: ordersReducer,
    subscriptions: subscriptionsReducer
  },
});
