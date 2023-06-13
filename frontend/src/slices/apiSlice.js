/*
 * This file sets up the API client using Redux Toolkit's createApi function.
 * It configures the base query and defines the API endpoints.
 * The generated API slice provides a convenient way to handle data fetching and caching in the Redux application.
 * In this app, we'll use apiSlice as the parent slice. Other slices will be created as child slices of apiSlice.
 */

// Import necessary dependencies
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Create the base query using the provided base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create the API slice using createApi
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'User', 'Order'], // Define tag types for generated hooks
  endpoints: (builder) => ({}), // Define your API endpoints within this function
});