"use client";

import { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type AppStore = ReturnType<typeof store>;

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
