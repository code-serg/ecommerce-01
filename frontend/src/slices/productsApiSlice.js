// Desc: Redux toolkit slice for products api
// Calls to the backend server are made using this productsApiSlice (uses apiSlice.js as the parent slice)

import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice'; // Parent slice

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
