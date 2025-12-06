import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LoginRequestDTO, LoginResponseDTO } from "@/shared/schemas";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponseDTO, LoginRequestDTO>({
      query: body => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
