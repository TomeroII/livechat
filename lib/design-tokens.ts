/**
 * LiveChat design tokens — "late-study-room" theme.
 *
 * The product is a chat app for student project teams: rooms double as
 * channels AND task boards. The palette reads as a dark room lit by a
 * desk lamp (amber) and a laptop screen (periwinkle) — the two light
 * sources of an actual study session. Keep this file as the single
 * source of truth; globals.css mirrors these as CSS custom properties.
 */

export const darkColors = {
  bgBase: "#14141C",
  bgSurface: "#1C1C27",
  bgElevated: "#24242F",
  border: "#2E2E3B",
  amber: "#FFB454",
  amberDeep: "#F2992E",
  periwinkle: "#6C8EFF",
  periwinkleDeep: "#8FA6FF",
  success: "#2DD4BF",
  danger: "#FF6B6B",
  warning: "#FFB454",
  textPrimary: "#EDEDF2",
  textSecondary: "#9494A6",
  textFaint: "#5F5F72",
} as const;

export const lightColors = {
  bgBase: "#F5F5F9",
  bgSurface: "#FFFFFF",
  bgElevated: "#F1F1F6",
  border: "#E3E3EC",
  amber: "#E08A1E",
  amberDeep: "#C4740F",
  periwinkle: "#4A67D6",
  periwinkleDeep: "#3A52B8",
  success: "#0F9C8B",
  danger: "#E14F4F",
  warning: "#E08A1E",
  textPrimary: "#14141C",
  textSecondary: "#5B5B6B",
  textFaint: "#8B8B9E",
} as const;

// Kept for any code that imports the old flat `colors` — mirrors dark mode.
export const colors = darkColors;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const fontVars = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const;
