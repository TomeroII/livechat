"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { buildAntdTheme, ThemeMode } from "@/lib/antd-theme";

const ThemeModeContext = createContext<{
  mode: ThemeMode;
  toggle: () => void;
} | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return ctx;
}

export default function ThemeModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The inline script in layout.tsx already set data-theme on <html>
  // before hydration, so read that instead of defaulting blind — this
  // avoids a light/dark mismatch flash on first paint.
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "light" || attr === "dark") return attr;
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("livechat-theme", mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ConfigProvider theme={buildAntdTheme(mode)}>
        {/* antd's App wrapper gives contextual message/notification/modal
            instances (via App.useApp()) that pick up the theme. */}
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
}
