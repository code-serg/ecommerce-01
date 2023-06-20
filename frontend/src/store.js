/*
 * This file configures the Redux store using Redux Toolkit's configureStore function.
 * It combines the reducer from the 'apiSlice' and adds necessary middleware.
 * The resulting store is exported and can be used throughout the application.
 */

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import loginSliceReducer from './slices/loginSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    login: loginSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
