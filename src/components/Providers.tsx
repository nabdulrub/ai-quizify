"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <QueryProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </QueryProvider>
  );
};

export default Providers;
