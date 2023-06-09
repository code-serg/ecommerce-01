// Desc: Users API slice for Redux Toolkit
// Calls to the backend server are made using this usersApiSlice (uses apiSlice.js as the parent slice)

import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; // Parent slice

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({ // mutation: request to update data on the server
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',  // sending data to the server
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL, // API to regiter is '/' (not /register)
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = usersApiSlice;