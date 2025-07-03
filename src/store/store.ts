import { configureStore } from "@reduxjs/toolkit";
import { instrumentsApi } from "@/store/user/instrumentsApi";

export const store = () =>
  configureStore({
    reducer: {
      [instrumentsApi.reducerPath]: instrumentsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(instrumentsApi.middleware),
  });
