
// Helper function to round a number to 2 decimal places
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Helper function to update the cart data and put it in localStorage
export const updateCart = (state) => {
   // calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // calculate shipping price (free shipping if items price > 100)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);

      // calculate tax price
      state.taxPrice = addDecimals(Number((0.10 * state.itemsPrice).toFixed(2)));

      // calculate total price
      state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
      
      localStorage.setItem('cart', JSON.stringify(state));

      return state;
}