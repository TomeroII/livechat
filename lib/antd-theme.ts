import { theme as antdThemeApi, type ThemeConfig } from "antd";
import { darkColors, lightColors, radius, fontVars } from "./design-tokens";

export type ThemeMode = "light" | "dark";

/**
 * antd v6 theme — tuned to the LiveChat palette instead of antd's stock
 * blue, in both light and dark. Component-level overrides live under
 * `components` so each piece (Button, Input, Menu…) matches the "study
 * room" identity rather than looking like default antd with a
 * recolored primary.
 */
export function buildAntdTheme(mode: ThemeMode): ThemeConfig {
  const c = mode === "dark" ? darkColors : lightColors;

  return {
    algorithm: mode === "dark" ? antdThemeApi.darkAlgorithm : antdThemeApi.defaultAlgorithm,
    token: {
      colorPrimary: c.amber,
      colorLink: c.periwinkle,
      colorLinkHover: c.periwinkleDeep,
      colorSuccess: c.success,
      colorWarning: c.warning,
      colorError: c.danger,

      colorBgBase: c.bgBase,
      colorBgContainer: c.bgSurface,
      colorBgElevated: c.bgElevated,
      colorBorder: c.border,
      colorBorderSecondary: c.border,

      colorText: c.textPrimary,
      colorTextSecondary: c.textSecondary,
      colorTextTertiary: c.textFaint,
      colorTextDescription: c.textSecondary,

      fontFamily: fontVars.body,
      fontSize: 14,
      borderRadius: radius.md,
      borderRadiusLG: radius.lg,
      borderRadiusSM: radius.sm,

      controlHeight: 38,
    },
    components: {
      Button: {
        fontWeight: 600,
        primaryShadow: "none",
        colorTextLightSolid: mode === "dark" ? c.bgBase : "#FFFFFF",
        defaultBg: c.bgElevated,
        defaultBorderColor: c.border,
        defaultColor: c.textPrimary,
      },
      Input: {
        colorBgContainer: c.bgElevated,
        activeBorderColor: c.amber,
        hoverBorderColor: c.amberDeep,
        activeShadow: `0 0 0 3px ${mode === "dark" ? "rgba(255, 180, 84, 0.15)" : "rgba(224, 138, 30, 0.12)"}`,
      },
      Menu: {
        itemBg: "transparent",
        itemSelectedBg: mode === "dark" ? "rgba(255, 180, 84, 0.14)" : "rgba(224, 138, 30, 0.10)",
        itemSelectedColor: c.amber,
        itemHoverBg: c.bgElevated,
        itemHoverColor: c.textPrimary,
        itemColor: c.textSecondary,
        iconSize: 16,
      },
      Card: {
        colorBgContainer: c.bgSurface,
        colorBorderSecondary: c.border,
      },
      Tabs: {
        itemSelectedColor: c.amber,
        itemHoverColor: c.textPrimary,
        itemColor: c.textSecondary,
        inkBarColor: c.amber,
      },
      Tag: {
        defaultBg: c.bgElevated,
        defaultColor: c.textSecondary,
      },
      Drawer: {
        colorBgElevated: c.bgSurface,
      },
      Modal: {
        colorBgElevated: c.bgSurface,
      },
      Segmented: {
        itemSelectedBg: c.bgElevated,
        itemSelectedColor: c.amber,
        trackBg: c.bgBase,
      },
      Checkbox: {
        colorPrimary: c.success,
        colorPrimaryHover: c.success,
      },
      List: {
        colorSplit: c.border,
      },
      Empty: {
        colorTextDisabled: c.textFaint,
      },
      Popover: {
        colorBgElevated: c.bgElevated,
      },
      Dropdown: {
        colorBgElevated: c.bgElevated,
      },
    },
  };
}
