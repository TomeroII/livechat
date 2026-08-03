"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button, Drawer, Space } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "./AuthProvider";

const navLinks = [
  { name: "Discover", href: "/discover" },
  { name: "Developers", href: "/developers" },
  { name: "Download", href: "/download" },
  { name: "Safety", href: "/safety" },
];
function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-0.5 group" aria-label="LiveChat home">
      <span
        className="text-2xl italic transition-opacity group-hover:opacity-80"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-amber)", fontWeight: 600 }}
      >
        Live
      </span>
      <span
        className="text-2xl transition-opacity group-hover:opacity-80"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", fontWeight: 600, letterSpacing: "-0.02em" }}
      >
        Chat
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header
      className="fixed top-0 z-50 w-full"
      style={{
        background: "rgba(20, 20, 28, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: 72 }}>
        <Wordmark />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors"
                style={{
                  color: active ? "var(--color-amber)" : "var(--color-text-secondary)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <Space size={12} className="hidden md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link href="/rooms">
                <Button type="primary">{user?.name ?? "Open rooms"}</Button>
              </Link>
              <Button type="text" onClick={logout} style={{ color: "var(--color-text-primary)" }}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button type="text" style={{ color: "var(--color-text-primary)" }}>
                  Log in
                </Button>
              </Link>
              <Link href="/login?mode=register">
                <Button type="primary">Get started</Button>
              </Link>
            </>
          )}
        </Space>

        <Space size={4} className="md:hidden">
          <ThemeToggle compact />
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "var(--color-text-primary)" }} />}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          />
        </Space>
      </div>

      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<CloseOutlined style={{ color: "var(--color-text-primary)" }} />}
        size={280}
        styles={{ body: { padding: 24 } }}
      >
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="text-base"
              style={{ color: "var(--color-text-primary)", fontWeight: 500 }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 20 }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              {isAuthenticated ? (
                <>
                  <Link href="/rooms" onClick={() => setDrawerOpen(false)}>
                    <Button block type="primary">
                      Open rooms
                    </Button>
                  </Link>
                  <Button
                    block
                    onClick={() => {
                      logout();
                      setDrawerOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setDrawerOpen(false)}>
                    <Button block>Log in</Button>
                  </Link>
                  <Link href="/login?mode=register" onClick={() => setDrawerOpen(false)}>
                    <Button block type="primary">
                      Get started
                    </Button>
                  </Link>
                </>
              )}
            </Space>
          </div>
        </Space>
      </Drawer>
    </header>
  );
}
