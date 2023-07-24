// Desc: Redux slice for managing user authentication
// This slice is used to store user credentials in the Redux store and localStorage, also to log out

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Retrieve user info from localStorage if available, or set to null
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

// Create the authentication slice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: 'auth', // Name of the slice
  initialState,
  reducers: {
    // Reducer for setting user credentials
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Update user info in the state
      localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Store user info in localStorage
    },
    // Reducer for logging out
    logout: (state) => {
      state.userInfo = null; // Remove user info from the state
      localStorage.removeItem('userInfo'); // Remove user info from localStorage
    },
  },
});

// Extract the action creators from the login slice
export const { setCredentials, logout } = authSlice.actions;

// Export the login reducer into the store - See store.js
export default authSlice.reducer;
