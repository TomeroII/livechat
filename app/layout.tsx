import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeModeProvider from "@/components/ThemeModeProvider";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "LiveChat — chat with your team, track the work",
  description:
    "Real-time rooms for project teams: chat and shared task lists in one place.",
};

// Runs before React hydrates so the light/dark pick from localStorage
// applies on first paint instead of flashing dark-then-light.
const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("livechat-theme");
    var mode = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", mode);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
      </head>
      <body>
        <AntdRegistry>
          <ThemeModeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeModeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
