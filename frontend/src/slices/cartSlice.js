// Desc: Redux slice for the cart
// This slice is used to store cart data in the Redux store and localStorage

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils'; // Update the cart data, and put it in localStorage

// Retrieve cart data from localStorage, or initialize an empty cart if there's nothing in localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'Paypal',
    };

const cartSlice = createSlice({
  name: 'cart', // name of the slice
  initialState, // initial state of the slice
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If the item already exists in the cart, replace it with the updated item
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
        // TODO: qty is not updating properly in the cart - ex: Add To Cart qty '2', then pick qty '1'. It only shows the last picked qty, but it should show the total qty '3'

      } else {
        // If the item doesn't exist in the cart, add it to the cartItems array
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state); 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); // Remove the item from the cartItems array

      return updateCart(state); 
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state); 
    }
  }
});

// Extract the action creators from the cart slice
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

// Export the cartSlice reducer into the store - See store.js
export default cartSlice.reducer;