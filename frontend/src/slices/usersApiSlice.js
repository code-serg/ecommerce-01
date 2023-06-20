// Desc: Users API slice for Redux Toolkit
// Calls to the backend server are made using this usersApiSlice (uses apiSlice.js as the parent slice)

import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"; // Parent slice

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({ // mutation: request to update data on the server
      query: (data) => ({
        url: USERS_URL/auth,
        method: 'POST',  // sending data to the server
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;