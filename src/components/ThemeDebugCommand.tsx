"use client";

import { useEffect } from "react";

type ThemeMode = "dark" | "light" | "system";

declare global {
  interface Window {
    toggleThemeDebug?: (mode?: ThemeMode) => ThemeMode;
  }
}

const DEBUG_THEME_ATTR = "data-debug-theme";
const DEBUG_THEME_STYLE_ID = "debug-theme-override";

const DARK_OVERRIDE = `:root[${DEBUG_THEME_ATTR}="dark"] {
  --background: #18181b !important;
  --foreground: #e4e4e7 !important;
  --primary: #fb923c !important;
  --surface: #27272a !important;
  --surface-border: #3f3f46 !important;
  --shadow-base: 255, 255, 255 !important;
}`;

const LIGHT_OVERRIDE = `:root[${DEBUG_THEME_ATTR}="light"] {
  --background: #fafafa !important;
  --foreground: #27272a !important;
  --primary: #f97316 !important;
  --surface: #f4f4f5 !important;
  --surface-border: #e4e4e7 !important;
  --shadow-base: 0, 0, 0 !important;
}`;

function getDebugStyleElement() {
  const existingStyle = document.getElementById(DEBUG_THEME_STYLE_ID);

  if (existingStyle instanceof HTMLStyleElement) {
    return existingStyle;
  }

  const styleElement = document.createElement("style");
  styleElement.id = DEBUG_THEME_STYLE_ID;
  document.head.appendChild(styleElement);

  return styleElement;
}

function applyDebugTheme(mode: ThemeMode): ThemeMode {
  const root = document.documentElement;

  if (mode === "system") {
    root.removeAttribute(DEBUG_THEME_ATTR);
    const style = document.getElementById(DEBUG_THEME_STYLE_ID);

    if (style) {
      style.remove();
    }

    return mode;
  }

  const styleElement = getDebugStyleElement();
  root.setAttribute(DEBUG_THEME_ATTR, mode);
  styleElement.textContent = mode === "dark" ? DARK_OVERRIDE : LIGHT_OVERRIDE;

  return mode;
}

function getCurrentMode(): ThemeMode {
  const mode = document.documentElement.getAttribute(DEBUG_THEME_ATTR);

  if (mode === "dark" || mode === "light") {
    return mode;
  }

  return "system";
}

function toggleMode(): ThemeMode {
  const currentMode = getCurrentMode();
  const nextMode = currentMode === "dark" ? "light" : "dark";

  return applyDebugTheme(nextMode);
}

export default function ThemeDebugCommand() {
  useEffect(() => {
    window.toggleThemeDebug = (mode) => {
      if (mode === undefined) {
        return toggleMode();
      }

      if (mode === "dark" || mode === "light" || mode === "system") {
        return applyDebugTheme(mode);
      }

      throw new Error(
        "Invalid mode. Use toggleThemeDebug(), toggleThemeDebug('dark'), toggleThemeDebug('light'), or toggleThemeDebug('system')."
      );
    };

    return () => {
      delete window.toggleThemeDebug;
    };
  }, []);

  return null;
}