"use client";
import { UserWrapper } from "./userContext";
import { createContext, useContext } from "react";

const AppContext = createContext({});

export function AppContextWrapper({ children }: { children: React.ReactNode }) {
  return <UserWrapper>{children}</UserWrapper>;
}

export function useAppContext() {
  return useContext(AppContext);
}
