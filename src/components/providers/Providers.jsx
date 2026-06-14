"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { buildTheme } from "./theme";
import { authEnabled } from "@/lib/config";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareProvider } from "@/context/CompareContext";

// --- Color mode (light/dark) ---
const ColorModeContext = createContext({ mode: "light", toggle: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

function ThemedApp({ children }) {
  const [mode, setMode] = useState("light");

  // Restore saved preference (and respect system on first load).
  useEffect(() => {
    const saved = localStorage.getItem("color-mode");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () =>
        setMode((m) => {
          const next = m === "light" ? "dark" : "light";
          localStorage.setItem("color-mode", next);
          return next;
        }),
    }),
    [mode]
  );

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Bridges Clerk's signed-in user into the FavoritesProvider.
function ClerkBridge({ children }) {
  const { user } = useUser();
  return <FavoritesProvider userId={user?.id || null}>{children}</FavoritesProvider>;
}

export default function Providers({ children }) {
  const inner = (
    <CompareProvider>
      <ThemedApp>{children}</ThemedApp>
    </CompareProvider>
  );

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      {authEnabled ? (
        <ClerkProvider>
          <ClerkBridge>{inner}</ClerkBridge>
        </ClerkProvider>
      ) : (
        <FavoritesProvider userId={null}>{inner}</FavoritesProvider>
      )}
    </AppRouterCacheProvider>
  );
}
