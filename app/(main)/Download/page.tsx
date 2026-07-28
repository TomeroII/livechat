"use client";

import { Button, App as AntdApp } from "antd";
import { DesktopOutlined, MobileOutlined, ChromeOutlined } from "@ant-design/icons";

const platforms = [
  { icon: <DesktopOutlined />, name: "Desktop", detail: "Windows, macOS, Linux" },
  { icon: <MobileOutlined />, name: "Mobile", detail: "iOS & Android" },
  { icon: <ChromeOutlined />, name: "Web", detail: "Use it right in the browser" },
];

export default function DownloadPage() {
  const { message } = AntdApp.useApp();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-3xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
        Get LiveChat
      </h1>
      <p className="text-sm mb-12" style={{ color: "var(--color-text-secondary)" }}>
        Native apps aren&rsquo;t built yet — the web app already works everywhere.
      </p>

      <div className="grid sm:grid-cols-3 gap-5">
        {platforms.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl p-8 flex flex-col items-center gap-3"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <span className="text-3xl" style={{ color: "var(--color-amber)" }}>
              {p.icon}
            </span>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-xs mb-2" style={{ color: "var(--color-text-faint)" }}>
              {p.detail}
            </p>
            <Button
              block
              onClick={() =>
                p.name === "Web"
                  ? (window.location.href = "/rooms")
                  : message.info(`${p.name} app is coming soon`)
              }
            >
              {p.name === "Web" ? "Open web app" : "Coming soon"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
