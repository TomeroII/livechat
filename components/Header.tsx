"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


const navLinks = [
  { name: "Discover", href: "/discover" },
  { name: "Developers", href: "/developers" },
  { name: "Download", href: "/download" },
  { name: "Login", href: "/login" },
  { name: "Rooms", href: "/rooms" },
  { name: "Safety", href: "/safety" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full backdrop:blur-sm
     bg-blue-600"
      style={{
        background: "#007bff",
        borderBottom: "1px solid #0056b3",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <link href="/" className="flex items-center gap-1 group">
          <span className="text-4xl transition-colors duration-300 group-hover:opacity-80"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              color: "var(--color-blue)",
            }}
          >
            Live
          </span>
          <span style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            letterSpacing: "-0.05em",
          }}>
            Chat
          </span>
        </link>


      </div>

    </header>



  )
}