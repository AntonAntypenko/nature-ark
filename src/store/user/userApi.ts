import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}users`,
  }),
  tagTypes: ["Users"],
  endpoints: builder => ({
    getUsers: builder.query<string[], void>({
      query: () => "",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
