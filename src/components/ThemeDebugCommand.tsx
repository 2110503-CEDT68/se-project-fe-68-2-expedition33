"use client";

import { useEffect } from "react";

type ThemeMode = "dark" | "light" | "system";

declare global {
  var toggleThemeDebug: ((mode?: ThemeMode) => ThemeMode) | undefined;
}

function applyTheme(mode: ThemeMode): ThemeMode {
  const root = document.documentElement;

  if (mode === "system") {
    delete root.dataset.theme;
    localStorage.removeItem("theme");
  } else {
    root.dataset.theme = mode;
    localStorage.setItem("theme", mode);
  }

  return mode;
}

function getCurrentMode(): ThemeMode {
  const mode = document.documentElement.dataset.theme;

  if (mode === "dark" || mode === "light") {
    return mode;
  }

  return "system";
}

function toggleMode(): ThemeMode {
  const currentMode = getCurrentMode();
  // If system, we need to check the actual preferred scheme to decide the next mode
  let effectiveMode = currentMode;
  if (currentMode === "system") {
      effectiveMode = globalThis.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  const nextMode = effectiveMode === "dark" ? "light" : "dark";

  return applyTheme(nextMode);
}

export default function ThemeDebugCommand() {
  useEffect(() => {
    // Initial load from localStorage
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved) {
        applyTheme(saved);
    }

    globalThis.toggleThemeDebug = (mode) => {
      if (mode === undefined) {
        return toggleMode();
      }

      if (mode === "dark" || mode === "light" || mode === "system") {
        return applyTheme(mode);
      }

      throw new Error(
        "Invalid mode. Use toggleThemeDebug(), toggleThemeDebug('dark'), toggleThemeDebug('light'), or toggleThemeDebug('system')."
      );
    };

    return () => {
      delete globalThis.toggleThemeDebug;
    };
  }, []);

  return null;
}