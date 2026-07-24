"use client";

import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useThemeMode } from "./ThemeModeProvider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, toggle } = useThemeMode();

  return (
    <Button
      type="text"
      shape="circle"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      icon={
        mode === "dark" ? (
          <SunOutlined style={{ color: "var(--color-text-secondary)" }} />
        ) : (
          <MoonOutlined style={{ color: "var(--color-text-secondary)" }} />
        )
      }
      size={compact ? "small" : "middle"}
    />
  );
}
