"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    
    // Initial system theme
    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    // Listener for system theme changes
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);

    // Initial load from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const resolvedTheme = useMemo(() => {
    if (theme !== "system") return theme;
    return systemTheme;
  }, [theme, systemTheme]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "system") {
      delete root.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      root.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    }
  };

  const handleSetTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    // Toggle based on what is currently active
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    handleSetTheme(nextTheme);
  }, [resolvedTheme, handleSetTheme]);

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme: handleSetTheme,
    toggleTheme
  }), [theme, resolvedTheme, handleSetTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
