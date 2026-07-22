"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationBar = [

];

export default function ChatHeader() {
  const pathname = usePathname
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-100 backdrop-blur-md" style={{
      background: "rgba(8,8,8,,0,9)",
      borderBottom: "1px solid rgba(8, 37, 103, 1.0)",
      boxShadow: "0 2px 30px rgba(0,0,0,0.7)",
    }}
    >
      <div className="max-w-7x1 mx-auto px-6 h-20 flex items-center justify-between">

        <link href="/" className="flex items-center gap-1 group">
          <span className="text-4xl transition-colors duration-300 group-hover:opacity-80"
            style={{
              fontFamily: "Var(-font-display), 'Bebas Neue',sans-serif",
              fontStyle: 'italic',
              color: "var(--db-blue)",
            }}
          >
            LiveChat
            <span style={{
              fontFamily: "var(--font-display), 'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              color: "var(--db-text)",
              letterSpacing: "0.05em",
            }}
            >
              Website
            </span>
          </span>
        </link>
      </div>
    </header>
  )
}