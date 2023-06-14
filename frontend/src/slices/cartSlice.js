import { createSlice } from '@reduxjs/toolkit';

// Retrieve cart data from localStorage, or initialize an empty cart if there's nothing in localStorage
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
    };

// Helper function to round a number to 2 decimal places
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
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

      // calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // calculate shipping price (free shipping if items price > 100)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

      // calculate tax price
      state.taxPrice = addDecimals(Number((0.10 * state.itemsPrice).toFixed(2)));

      // calculate total price
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
      
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

// Extract the addToCart action from the cartSlice object and export it
export const { addToCart } = cartSlice.actions;

// Export the cartSlice reducer
export default cartSlice.reducer;