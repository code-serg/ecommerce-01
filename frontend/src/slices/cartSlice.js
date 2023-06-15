import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Retrieve cart data from localStorage, or initialize an empty cart if there's nothing in localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
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
      } else {
        // If the item doesn't exist in the cart, add it to the cartItems array
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state); // Update the cart data, and put it in localStorage
    }
  }
});

// Extract the addToCart action from the cartSlice object and export it
export const { addToCart } = cartSlice.actions;

// Export the cartSlice reducer
export default cartSlice.reducer;