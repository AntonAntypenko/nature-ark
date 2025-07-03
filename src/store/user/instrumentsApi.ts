import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instrumentsApi = createApi({
  reducerPath: "instrumentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/instruments`,
  }),
  tagTypes: ["Instruments"],
  endpoints: builder => ({
    getInstruments: builder.query<string[], void>({
      query: () => "",
      providesTags: ["Instruments"],
    }),
  }),
});

export const { useGetInstrumentsQuery } = instrumentsApi;
